'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderWithMetrics } from '@/types/order';
import { exportFilteredData, exportFilteredDataJSON } from '@/lib/utils/export';
import { Download, FileDown, FileJson } from 'lucide-react';

interface ExportButtonProps {
  data: OrderWithMetrics[];
  filename?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

export function ExportButton({
  data,
  filename = 'musicow_orders',
  variant = 'outline',
  size = 'default',
}: ExportButtonProps) {
  const handleExportCSV = () => {
    if (data.length === 0) {
      alert('내보낼 데이터가 없습니다.');
      return;
    }
    exportFilteredData(data, filename);
  };

  const handleExportJSON = () => {
    if (data.length === 0) {
      alert('내보낼 데이터가 없습니다.');
      return;
    }
    exportFilteredDataJSON(data, filename);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Download className="mr-2 h-4 w-4" />
          내보내기 ({data.length}건)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileDown className="mr-2 h-4 w-4" />
          CSV 파일로 다운로드
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJSON}>
          <FileJson className="mr-2 h-4 w-4" />
          JSON 파일로 다운로드
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
