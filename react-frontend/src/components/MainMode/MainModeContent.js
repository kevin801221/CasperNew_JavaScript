import React from 'react';
import { useImageContext } from '../../contexts/ImageContext';
import UploadArea from './UploadArea';

/**
 * 主頁面的主要內容組件
 */
const MainModeContent = () => {
  return (
    <div className="flex flex-1">
      {/* 上傳區域 */}
      <UploadArea />
    </div>
  );
};

export default MainModeContent;
