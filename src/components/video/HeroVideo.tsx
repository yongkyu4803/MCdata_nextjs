'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
}

export function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서는 비디오 렌더링하지 않음
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* 배경 비디오 */}
      <video
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 산뜻한 오버레이 (텍스트 가독성) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/35 via-blue-500/25 to-cyan-500/35" />

      {/* 음소거 토글 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        aria-label={isMuted ? '음소거 해제' : '음소거'}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </>
  );
}
