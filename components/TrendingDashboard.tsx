'use client'

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { TrendingTopics } from './TrendingTopics';

export function TrendingDashboard() {
  useEffect(() => {
    // Notifies Farcaster that the mini app is ready and can hide the splash screen
    sdk.actions.ready();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <TrendingTopics />
    </div>
  );
}
