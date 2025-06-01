'use client';

import React from 'react';
import LoadingCube from './loading-cube';

interface PageLoadingProps {
  isLoading: boolean;
}

export function PageLoading({ isLoading }: PageLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/10 backdrop-blur-[2px] z-50">
      <LoadingCube />
    </div>
  );
} 