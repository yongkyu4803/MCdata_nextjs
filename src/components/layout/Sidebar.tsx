'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Zap,
  TrendingUp,
  DollarSign,
  TrendingDown,
  Droplets,
  Gem,
  BarChart3,
  Clock,
  Table,
} from 'lucide-react';

const navigation = [
  {
    name: '대시보드',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: '즉시 체결',
    href: '/dashboard/instant',
    icon: Zap,
  },
  {
    name: '가격 모멘텀',
    href: '/dashboard/momentum',
    icon: TrendingUp,
  },
  {
    name: '고수익률',
    href: '/dashboard/yield',
    icon: DollarSign,
  },
  {
    name: '저평가',
    href: '/dashboard/undervalued',
    icon: TrendingDown,
  },
  {
    name: '고유동성',
    href: '/dashboard/liquidity',
    icon: Droplets,
  },
  {
    name: '가치 투자',
    href: '/dashboard/value',
    icon: Gem,
  },
  {
    name: '카테고리 분석',
    href: '/dashboard/category',
    icon: BarChart3,
  },
  {
    name: '시간 패턴',
    href: '/dashboard/time-pattern',
    icon: Clock,
  },
  {
    name: '전체 데이터',
    href: '/dashboard/all-data',
    icon: Table,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/10">
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Musicow Dashboard
          </p>
        </div>
      </div>
    </aside>
  );
}
