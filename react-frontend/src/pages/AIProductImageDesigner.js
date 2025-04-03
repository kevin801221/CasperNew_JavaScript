import React from 'react';
import { useImageContext } from '../contexts/ImageContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainModeContent from '../components/MainMode/MainModeContent';
import BatchModeContent from '../components/BatchMode/BatchModeContent';
import CustomBgContent from '../components/CustomBg/CustomBgContent';
import BgResultsContent from '../components/BgResults/BgResultsContent';
import SizeAdjustContent from '../components/SizeAdjust/SizeAdjustContent';
import SingleEditorContent from '../components/SingleEditor/SingleEditorContent';

/**
 * AI 商品圖設計室 - 主組件
 * 實現產品圖片上傳、去背、批量處理功能
 */
const AIProductImageDesigner = () => {
  const { currentPage } = useImageContext();

  // 根據當前頁面渲染對應的內容組件
  const renderContent = () => {
    switch (currentPage) {
      case 'main':
        return <MainModeContent />;
      case 'batch':
        return <BatchModeContent />;
      case 'customBg':
        return <CustomBgContent />;
      case 'bgResults':
        return <BgResultsContent />;
      case 'sizeAdjust':
        return <SizeAdjustContent />;
      case 'singleEditor':
      case 'singleEditorResult':
        return <SingleEditorContent />;
      default:
        return <MainModeContent />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 頂部導航欄 */}
      <Header />
      
      {/* 主內容區 */}
      <div className="flex flex-1">
        {/* 側邊欄 - 只在主頁、批量處理和單張編輯頁面顯示 */}
        {['main', 'batch'].includes(currentPage) && (
          <Sidebar activePage="product" />
        )}
        
        {/* 渲染當前頁面內容 */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AIProductImageDesigner;
