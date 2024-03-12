// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@axiom-crypto/axiom-std/AxiomTest.sol";
import { AxiomGameDemo } from "../src/AxiomGameDemo.sol";
import { GameScore } from "../src/GameScore.sol";

import { console2 } from "forge-std/console2.sol";

contract AxiomGameDemoTest is AxiomTest {
    using Axiom for Query;

    struct AxiomInput {
        uint64 blockNumber;
        uint64 txIdx;
        uint64 logIdx;
    }

    address public constant SWAP_SENDER_ADDR = 0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce;
    AxiomGameDemo axiomGameDemo;
    GameScore gamescore;
    AxiomInput public input;
    bytes32 public querySchema;

    function setUp() public {
        _createSelectForkAndSetupAxiom("sepolia", 5_421_566);

        input = AxiomInput({
            blockNumber: 5_421_566,
            txIdx: 45,
            logIdx: 3
        });
        
        querySchema = axiomVm.readCircuit("app/axiom/swapEvent.circuit.ts");
        axiomGameDemo = new AxiomGameDemo(axiomV2QueryAddress, uint64(block.chainid), querySchema);
        gamescore = new GameScore(address(axiomGameDemo));
        axiomGameDemo.updateGameScoreAddress(address(gamescore));
        
    }

        /// @dev Simple demonstration of testing an Axiom client contract using Axiom cheatcodes
    function test_simple_example() public {
        bytes memory callbackExtraData = bytes("deadbeef00000000000000000000000000000000000000000000000000000000");
        IAxiomV2Query.AxiomV2FeeData memory feeData = IAxiomV2Query.AxiomV2FeeData({
            maxFeePerGas: 35 gwei,
            callbackGasLimit: 1_000_000,
            overrideAxiomQueryFee: 0
        });
        // create a query into Axiom with default parameters
        Query memory q = query(querySchema, abi.encode(input), address(axiomGameDemo),callbackExtraData, feeData, SWAP_SENDER_ADDR);

        // send the query to Axiom
        q.send();

        require(axiomGameDemo.lastTimeSwapped(SWAP_SENDER_ADDR) == 0, "User has already claimed this airdrop");
        bool prevStatus = gamescore.revival(SWAP_SENDER_ADDR);
        require(gamescore.revival(SWAP_SENDER_ADDR)  == prevStatus, "User did not receive 100 tokens");
        // prank fulfillment of the query, returning the Axiom results 
        bytes32[] memory results = q.prankFulfill();

        // parse Axiom results and verify length is as expected
        assertEq(results.length, 3);
        address userEventAddress = address(uint160(uint256(results[0])));
        uint32 blockNumber = uint32(uint256(results[1]));

        // verify the user claims the airdrop
        console2.log("User address: ", userEventAddress);
        require(SWAP_SENDER_ADDR == userEventAddress, "Invalid user address for event");
        require(axiomGameDemo.lastTimeSwapped(userEventAddress)==blockNumber, "User did not swapped");
        require(gamescore.revival(SWAP_SENDER_ADDR)  == true, "User did not receive revival");
    }

}
