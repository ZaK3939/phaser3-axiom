// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import { Ownable } from "@openzeppelin-contracts/access/Ownable.sol";
import { AxiomV2Client } from "@axiom-crypto/v2-periphery/client/AxiomV2Client.sol";
import { IGameScore } from "./IGameScore.sol";
import { console2 } from "forge-std/console2.sol";

contract AxiomGameDemo is AxiomV2Client, Ownable {
    event ClaimRevive(address indexed user, uint256 indexed queryId, uint256 numTokens, bytes32[] axiomResults);
    event ClaimReviveError(address indexed user, string error);
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event GameScoreAddressUpdated(address gamescore);

    bytes32 public constant SWAP_EVENT_SCHEMA = 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67;
    address public constant UNIV3_POOL_UNI_WETH0 = 0x224Cc4e5b50036108C1d862442365054600c260C;
    address public constant UNIV3_POOL_UNI_WETH1 = 0x287B0e934ed0439E2a7b1d5F0FC25eA2c24b64f7;
    uint32 public constant MIN_BLOCK_NUMBER = 4000000;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    mapping(address => bool) public querySubmitted;
    mapping(address => uint32) public lastTimeSwapped;

    IGameScore public gamescore;

    constructor(address _axiomV2QueryAddress, uint64 _callbackSourceChainId, bytes32 _axiomCallbackQuerySchema)
        AxiomV2Client(_axiomV2QueryAddress)
        Ownable(msg.sender)
    {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function updateCallbackQuerySchema(bytes32 _axiomCallbackQuerySchema) public onlyOwner {
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        emit AxiomCallbackQuerySchemaUpdated(_axiomCallbackQuerySchema);
    }

    function updateGameScoreAddress(address _gamescore) public onlyOwner {
        gamescore = IGameScore(_gamescore);
        emit GameScoreAddressUpdated(_gamescore);
    }

    function _axiomV2Callback(
        uint64, /* sourceChainId */
        address callerAddr,
        bytes32, /* querySchema */
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata /* extraData */
    ) internal virtual override {

        // Parse results
        address userEventAddress = address(uint160(uint256(axiomResults[0])));
        uint32 blockNumber = uint32(uint256(axiomResults[1]));
        address uniV3PoolUniWethAddr = address(uint160(uint256(axiomResults[2])));

        console2.log(callerAddr, userEventAddress, blockNumber, uniV3PoolUniWethAddr);
        // Validate the results
        require(userEventAddress == callerAddr, "Autonomous Airdrop: User address in results does not match caller address");
        require(
            blockNumber >= MIN_BLOCK_NUMBER,
            "Autonomous Airdrop: Block number for transaction receipt must be 4000000 or greater"
        );
        require(
            uniV3PoolUniWethAddr == UNIV3_POOL_UNI_WETH0 || 
            uniV3PoolUniWethAddr == UNIV3_POOL_UNI_WETH1,
            "Autonomous Airdrop: Address that emitted `Swap` event is not the UniV3 UNI-WETH pool address"
        );
        require(blockNumber > lastTimeSwapped[callerAddr], "Autonomous Airdrop: User has already revived using this swapped.");
        lastTimeSwapped[callerAddr] = blockNumber;

        // Transfer tokens to user
        gamescore.changeReviveStatus(callerAddr, true);
        emit ClaimRevive(callerAddr, queryId, 1, axiomResults);
    }

    function _validateAxiomV2Call(
        AxiomCallbackType, /* callbackType */
        uint64 sourceChainId,
        address, /* caller  */
        bytes32 querySchema,
        uint256, /* queryId */
        bytes calldata /* extraData */
    ) internal virtual override {
        require(sourceChainId == callbackSourceChainId, "AutonomousAirdrop: sourceChainId mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AutonomousAirdrop: querySchema mismatch");
    }
}
