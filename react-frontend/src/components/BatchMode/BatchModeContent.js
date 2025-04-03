import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import BackgroundPanel from './BackgroundPanel';
import ImageGrid from './ImageGrid';
import ZoomControls from './ZoomControls';
import Button from '../common/Button';

/**
 * 批量處理頁面的主要內容組件
 */
const BatchModeContent = () => {
  const { exitBatchMode } = useImageContext();

  return (
    <div className="flex flex-1">
      {/* 左側背景選擇面板 */}
      <BackgroundPanel />
      
      {/* 中央圖片網格區域 */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="p-4">
          {/* 頂部操作欄 */}
          <div className="flex mb-4 items-center">
            <Button 
              variant="outline"
              onClick={exitBatchMode}
              className="mr-2"
            >
              <ArrowLeft size={16} className="mr-1" />
              退出批量模式
            </Button>
          </div>
          
          {/* 圖片網格 */}
          <ImageGrid />
        </div>
      </div>
      
      {/* 右側縮放控制欄 */}
      <ZoomControls />
    </div>
  );
};

export default BatchModeContent;
