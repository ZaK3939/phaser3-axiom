// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IGameScore {
    function scores(address player) external view returns (uint256, uint256);
    function revival(address player) external view returns (uint256);
    function updateScore(uint256 _score) external;
    function depositReward() external payable;
    function payReward() external;
    function changeReviveStatus(address player, bool result) external;
}
