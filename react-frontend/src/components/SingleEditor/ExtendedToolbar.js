import React, { useState } from 'react';
import { 
  Scissors, Edit2, Image, PaintBucket, Square, CornerUpRight, 
  Type, AlignLeft, Bold, Italic, Underline, Strikethrough, 
  List, AlignJustify, Move, Copy, Sliders
} from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';

// 導入面板組件
import RemoveBackgroundPanel from './panels/RemoveBackgroundPanel';
import EditPanel from './panels/EditPanel';
import CropPanel from './panels/CropPanel';
import ColorPanel from './panels/ColorPanel';
import BorderPanel from './panels/BorderPanel';
import CornerRadiusPanel from './panels/CornerRadiusPanel';

/**
 * 擴展工具欄組件
 * 顯示在畫布上方的編輯工具按鈕
 */
const ExtendedToolbar = () => {
  const { 
    activeTool,
    setActiveTool
  } = useImageContext();
  
  // 當前選中的編輯工具
  const [activeEditTool, setActiveEditTool] = useState('');
  
  // 處理編輯工具點擊
  const handleEditToolClick = (tool) => {
    setActiveEditTool(tool === activeEditTool ? '' : tool);
  };
  
  // 關閉面板
  const handleClosePanel = () => {
    setActiveEditTool('');
  };
  
  // 文字編輯工具是否顯示
  const showTextTools = activeTool === 'text';
  
  return (
    <div className="relative">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center overflow-x-auto">
        {/* 基本編輯工具 */}
        <div className="flex items-center mr-4">
          <button 
            className={`p-1 text-gray-600 hover:text-gray-900 mx-1 ${activeEditTool === 'removeBackground' ? 'bg-gray-200 rounded' : ''}`}
            onClick={() => handleEditToolClick('removeBackground')}
            title="去背"
          >
            <Scissors size={18} />
          </button>
          <button 
            className={`p-1 text-gray-600 hover:text-gray-900 mx-1 ${activeEditTool === 'edit' ? 'bg-gray-200 rounded' : ''}`}
            onClick={() => handleEditToolClick('edit')}
            title="編輯"
          >
            <Edit2 size={18} />
          </button>
          <button 
            className={`p-1 text-gray-600 hover:text-gray-900 mx-1 ${activeEditTool === 'crop' ? 'bg-gray-200 rounded' : ''}`}
            onClick={() => handleEditToolClick('crop')}
            title="裁切"
          >
            <Image size={18} />
          </button>
          <button 
            className={`p-1 text-gray-600 hover:text-gray-900 mx-1 ${activeEditTool === 'color' ? 'bg-gray-200 rounded' : ''}`}
            onClick={() => handleEditToolClick('color')}
            title="顏色"
          >
            <PaintBucket size={18} />
          </button>
          <button 
            className={`p-1 text-gray-600 hover:text-gray-900 mx-1 ${activeEditTool === 'border' ? 'bg-gray-200 rounded' : ''}`}
            onClick={() => handleEditToolClick('border')}
            title="框線樣式"
          >
            <Square size={18} />
          </button>
          <button 
            className={`p-1 text-gray-600 hover:text-gray-900 mx-1 ${activeEditTool === 'cornerRadius' ? 'bg-gray-200 rounded' : ''}`}
            onClick={() => handleEditToolClick('cornerRadius')}
            title="邊角圓化"
          >
            <CornerUpRight size={18} />
          </button>
        </div>
        
        {/* 分隔線 */}
        <div className="h-5 border-l border-gray-300 mx-2"></div>
        
        {/* 文字編輯工具 - 只在選中文字工具時顯示 */}
        {showTextTools && (
          <div className="flex items-center">
            {/* 字型選擇 */}
            <select className="text-sm border border-gray-300 rounded px-2 py-1 mr-2">
              <option>微軟正黑體</option>
              <option>新細明體</option>
              <option>Arial</option>
              <option>Helvetica</option>
            </select>
            
            {/* 字型尺寸 */}
            <select className="text-sm border border-gray-300 rounded px-2 py-1 mr-2">
              <option>12</option>
              <option>14</option>
              <option>16</option>
              <option>18</option>
              <option>20</option>
              <option>24</option>
            </select>
            
            {/* 文字顏色 */}
            <div className="relative mr-2">
              <button className="w-6 h-6 border border-gray-300 rounded" style={{ backgroundColor: '#000000' }}></button>
            </div>
            
            {/* 文字樣式 */}
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="粗體">
              <Bold size={18} />
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="斜體">
              <Italic size={18} />
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="底線">
              <Underline size={18} />
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="刪除線">
              <Strikethrough size={18} />
            </button>
            
            {/* 文字對齊 */}
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="對齊">
              <AlignLeft size={18} />
            </button>
            
            {/* 清單 */}
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="清單">
              <List size={18} />
            </button>
            
            {/* 間距 */}
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="間距">
              <AlignJustify size={18} />
            </button>
            
            {/* 分隔線 */}
            <div className="h-5 border-l border-gray-300 mx-2"></div>
            
            {/* 其他文字工具 */}
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="文字垂直">
              <Type size={18} className="transform rotate-90" />
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="透明度">
              <Sliders size={18} />
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="位置">
              <Move size={18} />
            </button>
            <button className="p-1 text-gray-600 hover:text-gray-900 mx-1" title="複製樣式">
              <Copy size={18} />
            </button>
          </div>
        )}
      </div>
      
      {/* 編輯工具面板 */}
      <div className="absolute left-0 top-full z-10 flex">
        {activeEditTool === 'removeBackground' && <RemoveBackgroundPanel onClose={handleClosePanel} />}
        {activeEditTool === 'edit' && <EditPanel onClose={handleClosePanel} />}
        {activeEditTool === 'crop' && <CropPanel onClose={handleClosePanel} />}
        {activeEditTool === 'color' && <ColorPanel onClose={handleClosePanel} />}
        {activeEditTool === 'border' && <BorderPanel onClose={handleClosePanel} />}
        {activeEditTool === 'cornerRadius' && <CornerRadiusPanel onClose={handleClosePanel} />}
      </div>
    </div>
  );
};

export default ExtendedToolbar;
