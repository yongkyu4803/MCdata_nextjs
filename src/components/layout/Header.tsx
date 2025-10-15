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
    <header className="border-b bg-gradient-to-r from-purple-50 via-white to-purple-50 shadow-sm">
      <div className="flex py-8 items-center justify-between px-8">
        {/* 왼쪽 여백 */}
        <div className="flex-1" />

        {/* 중앙 제목 */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Musicow Market Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time Music Copyright Trading Data Analysis
          </p>
        </div>

        {/* 오른쪽 업데이트 정보 */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">Last Updated</span>
            <span className="text-sm font-medium">{formatDate(new Date(), 'MM-dd HH:mm')}</span>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
}
