import React from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 元素面板組件
 * 用於在單張編輯模式中添加元素
 */
const ElementPanel = () => {
  const { 
    setActiveTool
  } = useImageContext();

  // 模擬元素分類數據
  const elementCategories = [
    { id: 'all', name: '全部' },
    { id: 'shape', name: '形狀' },
    { id: 'line', name: '線條' },
    { id: 'icon', name: '圖標' },
    { id: 'sticker', name: '貼紙' }
  ];

  // 模擬元素數據
  const elements = [
    { id: 1, category: 'shape', name: '矩形', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" fill="none" stroke="black" stroke-width="2"/></svg>' },
    { id: 2, category: 'shape', name: '圓形', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="black" stroke-width="2"/></svg>' },
    { id: 3, category: 'shape', name: '三角形', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><polygon points="20,5 35,35 5,35" fill="none" stroke="black" stroke-width="2"/></svg>' },
    { id: 4, category: 'line', name: '直線', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><line x1="5" y1="20" x2="35" y2="20" stroke="black" stroke-width="2"/></svg>' },
    { id: 5, category: 'line', name: '箭頭', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><line x1="5" y1="20" x2="30" y2="20" stroke="black" stroke-width="2"/><polygon points="30,15 35,20 30,25" fill="black"/></svg>' },
    { id: 6, category: 'icon', name: '星星', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><polygon points="20,5 23,15 34,15 25,21 28,32 20,26 12,32 15,21 6,15 17,15" fill="none" stroke="black" stroke-width="2"/></svg>' },
    { id: 7, category: 'icon', name: '心形', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M20,35 L10,25 C5,20 5,15 10,10 C15,5 20,10 20,15 C20,10 25,5 30,10 C35,15 35,20 30,25 L20,35 Z" fill="none" stroke="black" stroke-width="2"/></svg>' },
    { id: 8, category: 'sticker', name: '笑臉', preview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="black" stroke-width="2"/><circle cx="15" cy="15" r="2" fill="black"/><circle cx="25" cy="15" r="2" fill="black"/><path d="M13,25 C15,28 25,28 27,25" fill="none" stroke="black" stroke-width="2"/></svg>' }
  ];

  // 處理元素點擊
  const handleElementClick = (element) => {
    console.log('添加元素:', element.name);
    // 在實際應用中，這裡會將元素添加到畫布上
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">元素</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="搜尋元素" 
            className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
          />
          <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex text-sm mb-4 overflow-x-auto py-1">
          {elementCategories.map(category => (
            <button 
              key={category.id}
              className={`px-2 py-1 ${category.id === 'all' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded mr-2 whitespace-nowrap`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {elements.map(element => (
            <div 
              key={element.id}
              className="flex flex-col items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => handleElementClick(element)}
            >
              <img src={element.preview} alt={element.name} className="w-10 h-10 mb-1" />
              <span className="text-xs text-center">{element.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">最近使用</h4>
          <div className="grid grid-cols-4 gap-2">
            {elements.slice(0, 4).map(element => (
              <div 
                key={element.id}
                className="flex flex-col items-center p-1 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => handleElementClick(element)}
              >
                <img src={element.preview} alt={element.name} className="w-8 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementPanel;
