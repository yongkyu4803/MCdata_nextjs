import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BarChart3, TrendingUp, Zap, ExternalLink } from 'lucide-react';
import { HeroVideo } from '@/components/video/HeroVideo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden min-h-[600px] bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
        {/* 배경 비디오 (데스크톱) */}
        <HeroVideo videoSrc="/videos/002_Music_Investment_Human_Connection_Story.mp4" />

        {/* 콘텐츠 */}
        <div className="relative z-10 max-w-4xl space-y-6 text-center px-4">
          <h1 className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl animate-fade-in">
            Musicow Market Analytics
          </h1>
          <h3 className="text-xl text-white/90 drop-shadow-lg">
            실시간 음악 저작권 거래 데이터를 분석하고 투자 기회를 발견하세요
          </h3>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/50 hover:border-white font-semibold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 backdrop-blur-sm">
                대시보드 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://musicow.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/50 hover:border-white font-semibold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 backdrop-blur-sm">
                뮤직카우 바로가기
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
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
      <section className="border-t bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-6">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white drop-shadow-lg">
            데이터 기반의 현명한 투자 결정을 내리세요
          </h2>
          <Link href="/dashboard">
            <Button
              size="sm"
              className="bg-white hover:bg-purple-50 text-purple-900 font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              지금 시작하세요
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-xs text-white/70">
              © 2025 Musicow Dashboard | Made by GQAI
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
