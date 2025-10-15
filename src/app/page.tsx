import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BarChart3, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-24">
        <div className="max-w-4xl space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            🎵 뮤직카우 시장 분석 대시보드
          </h1>
          <p className="text-xl text-muted-foreground">
            실시간 음악 저작권 거래 데이터를 분석하고 투자 기회를 발견하세요
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                대시보드 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-background py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">주요 기능</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <BarChart3 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>실시간 시장 분석</CardTitle>
                <CardDescription>
                  5분 간격으로 업데이트되는 실시간 주문 데이터와 지표
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 스프레드율 분석</li>
                  <li>• 예상 수익률 계산</li>
                  <li>• 유동성 점수</li>
                  <li>• 가격 모멘텀</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>투자 시그널</CardTitle>
                <CardDescription>
                  AI 기반 투자 시그널로 기회를 놓치지 마세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 저평가 종목 발굴</li>
                  <li>• 고수익률 기회</li>
                  <li>• 즉시 체결 가능 주문</li>
                  <li>• 가치 투자 기회</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>다양한 분석 도구</CardTitle>
                <CardDescription>
                  9개의 전문적인 분석 도구로 시장을 파악하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 카테고리 분석</li>
                  <li>• 시간 패턴 분석</li>
                  <li>• 유동성 분석</li>
                  <li>• 모멘텀 추적</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">지금 시작하세요</h2>
          <p className="mb-8 text-muted-foreground">
            데이터 기반의 현명한 투자 결정을 내리세요
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="default">
              대시보드로 이동
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
