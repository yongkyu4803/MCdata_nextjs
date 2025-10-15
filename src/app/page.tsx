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
      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 px-24">
        <div className="max-w-4xl space-y-3 text-center">
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Musicow Market Analytics
          </h1>
          <h3 className="text-lg text-muted-foreground">
            실시간 음악 저작권 거래 데이터를 분석하고 투자 기회를 발견하세요
          </h3>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
                대시보드 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-gradient-to-b from-white to-purple-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="rounded-full bg-purple-100 p-3 w-fit mb-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">실시간 시장 분석</CardTitle>
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

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="rounded-full bg-purple-100 p-3 w-fit mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">투자 시그널</CardTitle>
                <CardDescription>
                  투자 시그널로 기회를 놓치지 마세요
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

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="rounded-full bg-purple-100 p-3 w-fit mb-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">다양한 분석 도구</CardTitle>
                <CardDescription>
                  8개의 전문적인 분석 도구로 시장을 파악하세요
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

      {/* CTA Section - Footer Style */}
      <section className="border-t bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white drop-shadow-lg">
            데이터 기반의 현명한 투자 결정을 내리세요
          </h2>
          <p className="mb-8 text-lg text-purple-200">
            지금 바로 시작하여 투자 기회를 발견하세요
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white hover:bg-purple-50 text-purple-900 font-semibold shadow-xl hover:shadow-2xl transition-all border-2 border-white hover:scale-105">
              지금 시작하세요
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-12 pt-8 border-t border-purple-700/50">
            <p className="text-sm text-purple-300">
              © 2025 Musicow Dashboard | Made by GQAI
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
