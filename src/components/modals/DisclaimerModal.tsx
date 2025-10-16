'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 세션 스토리지에서 확인 여부 체크
    const hasSeenDisclaimer = sessionStorage.getItem('hasSeenDisclaimer');

    if (!hasSeenDisclaimer) {
      // 약간의 지연 후 모달 표시 (페이지 로드 후)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('hasSeenDisclaimer', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-amber-900">
            <AlertTriangle className="h-4 w-5 text-amber-600" />
            투자 관련 안내 및 면책공고
          </DialogTitle>
          <DialogDescription className="text-base pt-1">
            본 사이트 이용 전 반드시 아래 내용을 확인하시기 바랍니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 mt-1">
          {/* 관리자 공지사항 */}
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-3">
            <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              📢 관리자 공지사항
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              본 사이트는 뮤직카우에서 제공하는 거래정보를 기반으로 분석되었습니다. <strong>청약 또는 투자 권유를 목적으로 하지 않습니다.</strong> 또한 제공되는 정보에서 보여지는 종목들은 분석로직에 따라 정해지며, <strong>종목 추천을 위해 임의로 정보를 가공하지 않았습니다.</strong> 기타 자세한 안내는 아래 내용을 참고하시기 바랍니다.
            </p>
          </div>

          {/* 뮤직카우 투자관련 안내문 */}
          <div className="bg-amber-50 dark:bg-amber-950 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-5">
            <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
              ⚠️ 뮤직카우 투자관련 안내문
            </h3>
            <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-100">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>본 안내는 <strong>청약 또는 투자 권유를 목적으로 하지 않으며</strong>, 청약 또는 투자의 권유는 (예비, 간이)투자설명서에 따릅니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>투자자는 조각투자상품에 대하여 혁신금융사업자로부터 충분한 설명을 받을 권리가 있으며, <strong>투자 전 상품설명서 및 약관을 반드시 읽어보시기 바랍니다.</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>이 조각투자상품은 <strong>예금자보호법에 따라 보호되지 않습니다.</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>이 조각투자상품(또는 조각투자증권)은 수익증권 형태로 발행되어 거래되며, 보관기관 키움증권㈜에서 보관됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>㈜뮤직카우의 혁신금융서비스 지정기간은 2023.09.25. ~ 2025.09.24 이고, 조각투자 샌드박스 제도화에 따라 수익증권 투자중개업 인가를 준비하고 있습니다. 혁신사업자의 지위는 인가 신청 이후 인가 결정 시점까지 유지됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold mt-0.5">•</span>
                <span className="text-red-900 dark:text-red-100 font-semibold">이 조각투자상품은 조각투자증권의 가격 변동, 신용등급 하락, 사업종료 또는 서비스 중단 시 사업종료에 따른 자산의 매각·청산 절차 등에 따라 <strong>투자원금의 손실(0~100%)이 발생할 수 있으며</strong>, 그 손실은 투자자에게 귀속됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>혁신금융사업자 ㈜뮤직카우의 사업종료 또는 서비스 중단 시 자산 매각에 걸리는 소요시일은 약 6~12개월로 예상됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>조각투자상품 마켓 거래시 수수료는 1주당 1.0%, 5주 이상 구매 주문 시 0.8%이며 자세한 사항은 홈페이지 등을 참고하시기 바랍니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>조각투자상품 투자와 관련하여 비용 및 수수료가 추가로 발생할 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span><strong>과거의 수익 및 투자실적이 미래의 수익을 보장하지 않습니다.</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>㈜뮤직카우의 혁신금융서비스 지정 기간은 2025.09.24.에 만료되나, 혁신 사업자의 지위는 조각투자 샌드박스 제도화에 따라 수익증권 투자 중개업 인가 결정시점까지 유지되며, 인가를 받지 못하더라도 투자자는 신탁회사를 통해 수익증권 보유에 따른 수익을 분배받을 수 있습니다. 만약 지속적인 수익분배가 불가능할 경우, 자산 매각·청산 절차에 따라 투자원금의 회수 지연 및 원금 손실(0~100%)이 발생할 수 있으며, 투자자산 매각 시 소요되는 시일은 최소 6개월 이상으로 예상됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>이 조각투자상품에 대한 1인당 연간 투자 한도는 일반투자자 1천만원, 소득적격투자자 3천만원, 전문투자자 제한없음으로, 동일 종목에 대한 연간 투자한도는 일반투자자 3백만원, 소득적격투자자 1천만원, 전문투자자 제한없음이며, 매매회전율은 투자자 1인당 1일 100% 이하로 제한됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                <span>혁신금융사업자의 정책 및 서비스 제공 방식은 금융혁신법, 전자증권법 등 관련 법령 개정에 따라 변동될 수 있습니다.</span>
              </li>
            </ul>
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleConfirm}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-base"
            >
              확인했습니다
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
