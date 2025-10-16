'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils/format';
import { RefreshCw, Home } from 'lucide-react';
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
      {/* 데스크톱 헤더 */}
      <div className="hidden md:flex py-8 items-center justify-between px-8">
        {/* 왼쪽 Home 버튼 */}
        <div className="flex-1">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="shadow-sm hover:shadow-md transition-all hover:scale-105 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 border-purple-200"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

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

      {/* 모바일 헤더 */}
      <div className="md:hidden py-4 px-4">
        {/* 상단: 제목 + Refresh 버튼 */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Musicow Analytics
          </h1>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="shadow-sm"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </Button>
        </div>

        {/* 하단: Home 버튼 + 업데이트 시간 */}
        <div className="flex items-center justify-between text-xs">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="h-7 bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200"
            >
              <Home className="mr-1.5 h-3 w-3" />
              Home
            </Button>
          </Link>
          <div className="text-right">
            <span className="text-muted-foreground">Updated: </span>
            <span className="font-medium">{formatDate(new Date(), 'MM-dd HH:mm')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
