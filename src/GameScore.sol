// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract GameScore {
    struct ScoreRecord {
        address player;
        uint256 score;
        uint256 day;
    }

    // Tracks the last day when scores were updated
    uint256 private lastWithdraw;

    // Daily top player
    address private dailyTopPlayer;

    // Daily top score
    uint256 private dailyTopScore;

    // Contract owner
    address private owner;

    address private axiomAddress;

    // Player score records
    mapping(address => ScoreRecord) public scores;

    mapping(address => bool) public revival;

    event ScoreUpdated(address player, uint256 score, uint256 day);
    event RewardPaid(address player, uint256 amount);

    constructor(address _axiomAddress) {
        owner = msg.sender;
        axiomAddress = _axiomAddress;
    }

    // Updates the score for a player
    function updateScore(uint256 _score) public {
        if (_score > dailyTopScore) {
            dailyTopScore = _score;
            dailyTopPlayer = msg.sender;
        }

        scores[msg.sender] = ScoreRecord(msg.sender, _score, lastWithdraw);
        emit ScoreUpdated(msg.sender, _score, lastWithdraw);
    }

    // Deposits reward into the contract
    function depositReward() public payable {
        require(msg.sender == owner, "Only owner can deposit reward");
    }

    // Pays the reward to the top player of the day
    function payReward() public {
        require(block.timestamp > lastWithdraw + 86400, "Reward can only be paid after the day ends");
        require(msg.sender == owner, "Only owner can pay reward");
        require(dailyTopPlayer != address(0), "No top player for the day");

        uint256 rewardAmount = address(this).balance;
        payable(dailyTopPlayer).transfer(rewardAmount);
        emit RewardPaid(dailyTopPlayer, rewardAmount);

        // Reset for the next day
        lastWithdraw = block.timestamp;
        dailyTopScore = 0;
        dailyTopPlayer = address(0);
    }

    function changeReviveStatus(address _player,bool _result) public {
        require(msg.sender == axiomAddress , "Only authorizedContract can change revival");
        revival[_player] = _result;
    }

    function setAuthorizedContract(address _contract) public {
        require(msg.sender == owner, "Only owner can set the authorized contract");
        axiomAddress = _contract;
    }
    /*//////////////////////////////////////////////////////////////
                                DEFAULTS
    //////////////////////////////////////////////////////////////*/
    // Receive function to receive ETH
    receive() external payable { }
}

