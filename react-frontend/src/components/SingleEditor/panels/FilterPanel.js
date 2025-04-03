import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 濾鏡面板組件
 * 用於在單張編輯模式中應用預設濾鏡效果
 */
const FilterPanel = () => {
  const { 
    setActiveTool,
    currentFilter,
    applyFilter
  } = useImageContext();

  // 預設濾鏡列表
  const filters = [
    { id: 'none', name: '原始', preview: '/api/placeholder/80/80?text=原始' },
    { id: 'warm', name: '暖色調', preview: '/api/placeholder/80/80?text=暖色調' },
    { id: 'cool', name: '冷色調', preview: '/api/placeholder/80/80?text=冷色調' },
    { id: 'vintage', name: '復古', preview: '/api/placeholder/80/80?text=復古' },
    { id: 'bw', name: '黑白', preview: '/api/placeholder/80/80?text=黑白' },
    { id: 'sepia', name: '懷舊', preview: '/api/placeholder/80/80?text=懷舊' },
    { id: 'dramatic', name: '戲劇', preview: '/api/placeholder/80/80?text=戲劇' },
    { id: 'vivid', name: '鮮豔', preview: '/api/placeholder/80/80?text=鮮豔' },
    { id: 'muted', name: '柔和', preview: '/api/placeholder/80/80?text=柔和' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">濾鏡</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-4">
            選擇一個濾鏡效果應用於圖片
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {filters.map(filter => (
              <div 
                key={filter.id}
                className={`cursor-pointer ${currentFilter === filter.id ? 'ring-2 ring-amber-700' : ''}`}
                onClick={() => applyFilter(filter.id)}
              >
                <div className="aspect-square overflow-hidden rounded mb-1">
                  <img 
                    src={filter.preview} 
                    alt={filter.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-center">{filter.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-2">提示</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li className="mb-1">濾鏡可以快速改變圖片的整體風格</li>
            <li className="mb-1">點擊濾鏡縮圖即可應用</li>
            <li>選擇「原始」可以移除所有濾鏡效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
