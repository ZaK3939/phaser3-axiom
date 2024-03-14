## Phaser3 + Axiom Game

### Overview

Welcome to our innovative blockchain-based game where players can earn rewards through gameplay. This Phaser3 game integrates with Axiom and Uniswap to provide a unique gaming experience where players can earn in-game prizes for achieving high scores.
![OverView](/gameimage.png)

### How It Works

- Start Game: Players begin their journey in an exciting game environment.
- Gameplay: When a player's character dies in-game, they have the chance to revive by engaging with the blockchain.
- Transaction: To revive, players complete a transaction on Uniswap.
  ![OverView](/uniswap.png)

- Verification: The transaction is verified using Axiom, allowing the player to revive and continue playing.
  High Scores: Players submit their scores to the blockchain for validation. The higher your score, the better your chances of earning a reward.

- Daily Rewards: The top player of the day, as recorded on the leaderboard, can claim a reward.

![OverView](/overview.png)
https://app.uniswap.org/swap?chain=sepolia

### On-Chain Interaction

The game leverages blockchain technology to record player scores and manage rewards.
Players must connect their wallets to interact with the on-chain components of the game.

### Rewards System

In-Game Achievement: If you are the top player of the day, you are eligible to claim your reward.
Reward Distribution: Uniswap optimistically provides rewards for high scores.

```
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
```

### Continuity of Play

Revival Mechanism: If a user creates a transaction after the player is dead, the player revives, which could potentially lead to a higher score.
End of Day: At the end of the day, the player with the highest score is announced, and they can claim their reward after the day is over.

### Get Started

To play the game and start earning rewards:

Connect your digital wallet.
Start the game and strive for a high score.
Complete Uniswap transactions if necessary.
Verify your transactions with Axiom.
Submit your high score and potentially earn rewards.
For detailed instructions and game rules, please refer to our Gameplay Guide.

### Contributions

We welcome contributions from the community. If you have any suggestions or want to contribute to the code, please refer to our Contribution Guidelines.

### License

This project is licensed under the MIT License
