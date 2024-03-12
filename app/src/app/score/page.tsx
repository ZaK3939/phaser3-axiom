'use client';

import Title from '@/components/ui/Title';
import { Constants } from '@/shared/constants';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EventBus } from '../EventBus';
import AdvanceStepButton from '@/components/ui/AdvanceStepButton';

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Score({ searchParams }: PageProps) {
  return (
    <>
      <Title>Success update score</Title>
    </>
  );
}
