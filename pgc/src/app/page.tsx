"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  const searchParams = useSearchParams();
  const user = searchParams?.get('User') || '';
  const router = useRouter();

  useEffect(() => {
    if (user === '') {
      router.push('/home');
    }
  }, [user, router]);

  return (
    <>
      {children}
    </>
  );
}

export default Root;