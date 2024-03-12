// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import {AxiomGameDemo} from "../src/AxiomGameDemo.sol";
import {GameScore} from "../src/GameScore.sol";
import {BaseScript} from "script/Base.s.sol";

contract AxiomGameDemoScript is BaseScript {
    address public constant AXIOM_V2_QUERY_MOCK_SEPOLIA_ADDR = 0x83c8c0B395850bA55c830451Cfaca4F2A667a983;
    bytes32 querySchema;

    function setUp() public {
        string memory artifact = vm.readFile("./app/axiom/data/compiled.json");
        querySchema = bytes32(vm.parseJson(artifact, ".querySchema"));
    }

    function run() public {
        vm.startBroadcast();

        AxiomGameDemo aa = new AxiomGameDemo(AXIOM_V2_QUERY_MOCK_SEPOLIA_ADDR, 11155111, querySchema);

        GameScore ut = new GameScore(address(aa));
        aa.updateGameScoreAddress(address(ut));

        vm.stopBroadcast();
    }
}
