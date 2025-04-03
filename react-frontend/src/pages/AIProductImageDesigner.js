import React from 'react';
import { useImageContext } from '../contexts/ImageContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainModeContent from '../components/MainMode/MainModeContent';
import BatchModeContent from '../components/BatchMode/BatchModeContent';

/**
 * AI 商品圖設計室 - 主組件
 * 實現產品圖片上傳、去背、批量處理功能
 */
const AIProductImageDesigner = () => {
  const { currentPage } = useImageContext();

  return (
    <div className="flex flex-col h-screen">
      {/* 頂部導航欄 */}
      <Header />
      
      {/* 主內容區 */}
      <div className="flex flex-1">
        {/* 側邊欄 */}
        <Sidebar activePage="product" />
        
        {/* 根據當前頁面渲染不同的內容 */}
        {currentPage === 'main' ? <MainModeContent /> : <BatchModeContent />}
      </div>
    </div>
  );
};

export default AIProductImageDesigner;
