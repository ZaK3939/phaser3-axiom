'use client';
import AdvanceStepButton from '@/components/ui/AdvanceStepButton';
import Title from '@/components/ui/Title';
import CodeBox from '@/components/ui/CodeBox';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EventBus } from './EventBus';
import UpdateScoreClient from '@/components/score/UpdateScoreClient';
import GameScore from '@/lib/abi/GameScore.json';

export default async function Home() {
  let compiledCircuit;
  try {
    compiledCircuit = require('../../axiom/data/compiled.json');
  } catch (e) {
    console.log(e);
  }
  if (compiledCircuit === undefined) {
    return (
      <>
        <div>Compile circuit first by running in the root directory of this project:</div>
        <CodeBox>{'npx axiom compile circuit app/axiom/swapEvent.circuit.ts'}</CodeBox>
      </>
    );
  }

  const [gameover, setGameOver] = useState(false);

  useEffect(() => {
    setGameOver(false);
  }, []);

  EventBus.on('gameover', (data: any) => {
    setGameOver(true);
  });

  const [createScore, setCreateScore] = useState(0);

  useEffect(() => {
    setCreateScore(0);
  }, []);

  EventBus.on('submit score', (data: any) => {
    console.log(Number(data));
    setCreateScore(Number(data));
  });

  return (
    <>
      {!gameover ? (
        <div className='text-center'>
          Get another life by Swap on Uniswap! <br />
          Aiming "Top High Score" for the prize in the daily competition.
        </div>
      ) : (
        <div className='text-center'>
          Go{' '}
          <Link href='https://app.uniswap.org/swap' target='_blank'>
            Uniswap
          </Link>{' '}
          and Swap Uni-WETH. You can continue your game by reviving through transactions on Uniswap.
        </div>
      )}

      {gameover ? <AdvanceStepButton label='Generate Proof for Reborn' href={'/check'} /> : null}
      {createScore ? <UpdateScoreClient score={createScore} scoreUpdateAbi={GameScore.abi} /> : null}
    </>
  );
}
