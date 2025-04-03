import React from 'react';
import { Search, Plus } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import Button from '../common/Button';

/**
 * 批量處理頁面的背景選擇面板
 */
const BackgroundPanel = () => {
  const { 
    recommendedBackgrounds,
    recentlyUsedBackgrounds,
    backgroundCategories,
    backgroundSubCategories,
    backgroundCategory,
    setBackgroundCategory,
    searchQuery,
    setSearchQuery
  } = useImageContext();

  // 處理分類切換
  const handleCategoryChange = (categoryId) => {
    setBackgroundCategory(categoryId);
  };

  // 處理搜索輸入
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 處理背景選擇
  const handleBackgroundSelect = (backgroundUrl) => {
    console.log('選擇背景:', backgroundUrl);
    // 這裡可以添加選擇背景的邏輯
  };

  // 處理生成按鈕點擊
  const handleGenerate = () => {
    console.log('生成最終結果');
    // 這裡可以添加生成最終結果的邏輯
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* 推薦區域 */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">推薦</h3>
          <div className="flex flex-wrap gap-2">
            {recommendedBackgrounds.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="推薦背景" 
                className="w-20 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                onClick={() => handleBackgroundSelect(img)}
              />
            ))}
          </div>
        </div>
        
        {/* 最近常用區域 */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">最近常用</h3>
          <div className="flex flex-wrap gap-2">
            {recentlyUsedBackgrounds.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="最近常用背景" 
                className="w-20 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                onClick={() => handleBackgroundSelect(img)}
              />
            ))}
          </div>
        </div>
        
        {/* 搜索區域 */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">搜索</h3>
          <div className="relative mb-2">
            <Search size={16} className="absolute left-2 top-2 text-gray-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="輸入圖片關鍵字尋找" 
              className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          
          {/* 分類標籤 */}
          <div className="flex text-sm mb-2 overflow-x-auto py-1">
            {backgroundCategories.map(category => (
              <button 
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-2 py-1 rounded mr-2 whitespace-nowrap ${
                  backgroundCategory === category.id 
                    ? 'bg-gray-200' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* 子分類 */}
          <div className="flex flex-wrap text-xs mb-2">
            {backgroundSubCategories.map(category => (
              <button 
                key={category.id}
                className="px-2 py-1 hover:bg-gray-100 rounded mr-2 mb-1"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* 顏色空間區域 */}
        <div className="mb-4">
          <h3 className="font-medium mb-2 flex justify-between">
            顏色空間
            <span className="text-xs text-gray-500 cursor-pointer">更多 &gt;</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="w-16 h-16 bg-pink-200 rounded flex items-center justify-center cursor-pointer hover:opacity-80">
              <Plus size={20} className="text-pink-500" />
            </div>
            {recentlyUsedBackgrounds.slice(0, 2).map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="顏色空間背景" 
                className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                onClick={() => handleBackgroundSelect(img)}
              />
            ))}
          </div>
        </div>
        
        {/* 文青白系區域 */}
        <div className="mb-4">
          <h3 className="font-medium mb-2 flex justify-between">
            文青白系
            <span className="text-xs text-gray-500 cursor-pointer">更多 &gt;</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentlyUsedBackgrounds.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="文青白系背景" 
                className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                onClick={() => handleBackgroundSelect(img)}
              />
            ))}
          </div>
        </div>
        
        {/* 生成按鈕 */}
        <Button 
          variant="primary"
          onClick={handleGenerate}
          className="w-full mt-4"
        >
          生成
        </Button>
      </div>
    </div>
  );
};

export default BackgroundPanel;
