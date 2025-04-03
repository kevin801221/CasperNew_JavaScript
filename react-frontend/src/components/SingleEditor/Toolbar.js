import React from 'react';
import { ArrowLeft, RotateCcw, RotateCw, Maximize2, Minimize2, Trash2, Download } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';

/**
 * 單張編輯模式的工具欄組件
 * 顯示在畫布頂部的操作按鈕
 */
const Toolbar = () => {
  const { 
    goToMainPage,
    handleRotate,
    handleFlip,
    handleDelete,
    handleDownload
  } = useImageContext();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="flex items-center text-gray-700 hover:text-gray-900 mr-4"
          onClick={goToMainPage}
        >
          <ArrowLeft size={18} className="mr-1" />
          返回
        </button>
        
        <div className="h-5 border-l border-gray-300 mx-2"></div>
        
        <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" onClick={() => handleRotate(-90)}>
          <RotateCcw size={18} />
        </button>
        <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" onClick={() => handleRotate(90)}>
          <RotateCw size={18} />
        </button>
        <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" onClick={() => handleFlip('horizontal')}>
          <Maximize2 size={18} className="transform rotate-90" />
        </button>
        <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" onClick={() => handleFlip('vertical')}>
          <Maximize2 size={18} />
        </button>
        
        <div className="h-5 border-l border-gray-300 mx-2"></div>
        
        <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" onClick={handleDelete}>
          <Trash2 size={18} />
        </button>
      </div>
      
      <div>
        <button 
          className="flex items-center bg-amber-700 text-white px-3 py-1 rounded hover:bg-amber-800"
          onClick={handleDownload}
        >
          <Download size={16} className="mr-1" />
          下載
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
