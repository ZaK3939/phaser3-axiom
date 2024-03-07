'use client';
import AdvanceStepButton from '@/components/ui/AdvanceStepButton';
import Title from '@/components/ui/Title';
import CodeBox from '@/components/ui/CodeBox';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EventBus } from './EventBus';

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

  EventBus.on('gameover', (data) => {
    console.log('game over');
    setGameOver(true);
    // Do something with the data
  });
  return (
    <>
      <Title>Crypto Resurgence</Title>
      <div className='text-center'>
        Players can revive through transactions on{' '}
        <Link href='https://app.uniswap.org/swap' target='_blank'>
          Uniswap
        </Link>{' '}
        and extend their score by utilizing verification on Axiom, <br />
        Aiming "Top High Score" for the prize provided by Uniswap in the daily competition.
      </div>
      {/* if gameover is true, button appeared */}

      {gameover ? <AdvanceStepButton label='Generate Proof' href={'/check'} /> : null}
    </>
  );
}
