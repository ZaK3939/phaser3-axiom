import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import Button from '../ui/Button';
import { useRouter } from 'next/router';
import { Constants } from "@/shared/constants";

const UpdateScoreClient = ({ score, scoreUpdateAbi }: { score: number, scoreUpdateAbi: any[] }) => {
  const { address } = useAccount();
  // const router = useRouter();
  const [showExplorerLink, setShowExplorerLink] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  useEffect(() => {
    if (isSuccess && transactionHash) {
      const timeoutId = setTimeout(() => {
        setShowExplorerLink(true);
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess, transactionHash]);

  const renderExplorerLink = () => {
    if (showExplorerLink && transactionHash) {
      const explorerUrl = `https://etherscan.io/tx/${transactionHash}`;
      return <a href={explorerUrl} target="_blank" rel="noopener noreferrer">View on Etherscan</a>;
    }
    return null;
  };

  // Monitor contract for `ScoreUpdated`
  useWatchContractEvent({
    address: Constants.GAME_SCORE as `0x${string}`, // Replace with your contract address
    abi: scoreUpdateAbi,
    eventName: 'ScoreUpdated',
    onLogs(logs: any) {
      // Log event if needed, consider environment
    },
  });

  const renderButtonText = () => {
    if (isPending) return "Updating score...";
    if (isSuccess) return "Score Updated!";
    if (isError) return "Error in updating score";
    return "Update Score";
  };

  const updateScore = () => {
    console.log('Updating score...');
    console.log(Constants.GAME_SCORE,scoreUpdateAbi)
    writeContract({
      address: Constants.GAME_SCORE,
      abi: scoreUpdateAbi,
      functionName: 'updateScore',
      args: [score],
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={isPending || isSuccess || isError}
        onClick={updateScore}
      >
        {renderButtonText()}
      </Button>
      {renderExplorerLink()}
      {isError && <p>Error updating score. Please try again.</p>}
    </div>
  );
};

export default UpdateScoreClient;
