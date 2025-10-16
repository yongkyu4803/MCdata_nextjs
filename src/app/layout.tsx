import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { QueryProvider } from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '뮤직카우 시장 분석 대시보드',
  description: '실시간 음악 저작권 거래 데이터 분석 및 시장 시그널',
  keywords: ['뮤직카우', '음악저작권', '시장분석', '데이터분석', '대시보드'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
