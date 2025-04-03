import React, { useRef, useEffect } from 'react';
import { Save, Download, RotateCcw, RotateCw } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';

/**
 * 頂部導航欄組件
 */
const Header = () => {
  const { 
    isFileMenuOpen, 
    setIsFileMenuOpen, 
    isDownloadMenuOpen, 
    setIsDownloadMenuOpen 
  } = useImageContext();
  
  const fileMenuRef = useRef(null);
  const downloadMenuRef = useRef(null);

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
        setIsFileMenuOpen(false);
      }
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
        setIsDownloadMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsFileMenuOpen, setIsDownloadMenuOpen]);

  // 切換檔案選單
  const toggleFileMenu = () => {
    setIsFileMenuOpen(!isFileMenuOpen);
    if (isDownloadMenuOpen) setIsDownloadMenuOpen(false);
  };

  // 切換下載選單
  const toggleDownloadMenu = () => {
    setIsDownloadMenuOpen(!isDownloadMenuOpen);
    if (isFileMenuOpen) setIsFileMenuOpen(false);
  };

  // 處理儲存功能
  const handleSave = () => {
    console.log('儲存圖片');
    setIsFileMenuOpen(false);
  };

  // 處理下載功能
  const handleDownload = (format) => {
    console.log(`下載圖片為 ${format} 格式`);
    setIsDownloadMenuOpen(false);
  };

  // 處理復原功能
  const handleUndo = () => {
    console.log('復原編輯');
  };

  // 處理重做功能
  const handleRedo = () => {
    console.log('重做編輯');
  };

  return (
    <header className="bg-amber-50 border-b border-amber-100 p-2 flex justify-between items-center">
      {/* 左側區域 */}
      <div className="flex items-center">
        <h1 className="text-lg font-medium mr-6">AI 商品圖設計室</h1>
        
        {/* 檔案按鈕與下拉選單 */}
        <div className="relative mr-2" ref={fileMenuRef}>
          <Button 
            variant="outline" 
            onClick={toggleFileMenu}
            className="text-sm"
          >
            檔案
          </Button>
          
          {isFileMenuOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md py-1 z-10 w-32">
              <button 
                onClick={handleSave}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center"
              >
                <Save size={16} className="mr-2" />
                儲存
              </button>
              <button 
                onClick={toggleDownloadMenu}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center"
              >
                <Download size={16} className="mr-2" />
                下載
              </button>
            </div>
          )}
          
          {/* 下載格式選單 */}
          {isDownloadMenuOpen && (
            <div className="absolute top-full left-32 mt-1 bg-white shadow-md rounded-md py-1 z-10 w-32" ref={downloadMenuRef}>
              <button 
                onClick={() => handleDownload('jpg')}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                JPG
              </button>
              <button 
                onClick={() => handleDownload('png')}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                PNG
              </button>
              <button 
                onClick={() => handleDownload('pdf')}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                PDF
              </button>
            </div>
          )}
        </div>
        
        {/* 復原/重做按鈕 */}
        <Button 
          variant="icon" 
          onClick={handleUndo}
          className="mr-1 p-2"
        >
          <RotateCcw size={16} />
        </Button>
        
        <Button 
          variant="icon" 
          onClick={handleRedo}
          className="p-2"
        >
          <RotateCw size={16} />
        </Button>
      </div>
      
      {/* 右側區域 */}
      <div className="flex items-center">
        <div className="mr-4 text-sm">
          <span className="text-gray-600">Point 點數：</span>
          <span className="font-medium">1,000</span>
        </div>
        
        <Button 
          variant="outline" 
          className="text-sm mr-2"
          onClick={() => console.log('前往儲值')}
        >
          前往儲值
        </Button>
        
        <Button 
          variant="outline" 
          className="text-sm"
          onClick={() => console.log('查看 Point 紀錄')}
        >
          查看 Point 紀錄
        </Button>
      </div>
    </header>
  );
};

export default Header;
