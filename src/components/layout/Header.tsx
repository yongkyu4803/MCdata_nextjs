'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils/format';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function Header() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['orders'] });
    await queryClient.invalidateQueries({ queryKey: ['summary'] });
    await queryClient.invalidateQueries({ queryKey: ['momentum'] });
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold">🎵 뮤직카우 시장 분석</h1>
          <p className="text-sm text-muted-foreground">
            실시간 음악 저작권 거래 데이터 분석
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            마지막 업데이트: {formatDate(new Date())}
          </span>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            새로고침
          </Button>
        </div>
      </div>
    </header>
  );
}
