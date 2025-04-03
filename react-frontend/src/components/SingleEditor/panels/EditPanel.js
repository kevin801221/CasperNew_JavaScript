import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw, RotateCw, RefreshCw, Maximize2, Minimize2, Zap, Sliders } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 編輯功能面板組件
 * 用於在單張編輯模式中調整圖片比例、翻轉、參數和濾鏡
 */
const EditPanel = ({ onClose }) => {
  const { 
    handleRotate,
    handleFlip,
    brightness,
    contrast,
    saturation,
    sharpness,
    isProcessing,
    handleBrightnessChange,
    handleContrastChange,
    handleSaturationChange,
    handleSharpnessChange,
    applyAdjustments,
    handleAutoAdjust
  } = useImageContext();
  
  // 當前編輯標籤
  const [activeTab, setActiveTab] = useState('ratio'); // 'ratio', 'flip', 'adjust', 'filter'
  
  // 比例設置
  const [aspectRatio, setAspectRatio] = useState('original');
  
  // 本地參數調整值 (用於UI顯示)
  const [localBrightness, setLocalBrightness] = useState(brightness);
  const [localContrast, setLocalContrast] = useState(contrast);
  const [shadows, setShadows] = useState(0);
  const [localSaturation, setLocalSaturation] = useState(saturation);
  const [localSharpness, setLocalSharpness] = useState(sharpness);
  const [whiteBalance, setWhiteBalance] = useState(0);
  
  // 當上下文中的值變化時，更新本地狀態
  useEffect(() => {
    setLocalBrightness(brightness);
    setLocalContrast(contrast);
    setLocalSaturation(saturation);
    setLocalSharpness(sharpness);
  }, [brightness, contrast, saturation, sharpness]);
  
  // 濾鏡強度
  const [filterStrength, setFilterStrength] = useState(50);
  
  // 當前選中的濾鏡
  const [selectedFilter, setSelectedFilter] = useState(null);
  
  // 濾鏡列表
  const filters = [
    { id: 'original', name: '原始', preview: '/api/placeholder/60/60?text=原始' },
    { id: 'vivid', name: '鮮豔', preview: '/api/placeholder/60/60?text=鮮豔' },
    { id: 'warm', name: '暖色', preview: '/api/placeholder/60/60?text=暖色' },
    { id: 'cool', name: '冷色', preview: '/api/placeholder/60/60?text=冷色' },
    { id: 'bw', name: '黑白', preview: '/api/placeholder/60/60?text=黑白' },
    { id: 'vintage', name: '復古', preview: '/api/placeholder/60/60?text=復古' }
  ];
  
  // 處理自動調整
  const handleAutoAdjustLocal = () => {
    if (isProcessing) return;
    handleAutoAdjust();
  };
  
  // 處理提升畫質
  const handleEnhanceQuality = () => {
    console.log('提升圖片畫質');
    // 在實際應用中，這裡會提升圖片畫質
  };
  
  // 重設調整
  const handleResetAdjustments = () => {
    console.log('重設調整');
    setLocalBrightness(0);
    setLocalContrast(0);
    setShadows(0);
    setLocalSaturation(0);
    setLocalSharpness(0);
    setWhiteBalance(0);
    
    // 更新上下文中的值
    handleBrightnessChange(0);
    handleContrastChange(0);
    handleSaturationChange(0);
    handleSharpnessChange(0);
  };
  
  // 渲染比例標籤內容
  const renderRatioTab = () => (
    <div>
      <h4 className="font-medium mb-2">比例</h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button 
          className={`p-2 text-center text-sm border ${aspectRatio === 'original' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setAspectRatio('original')}
        >
          原始
        </button>
        <button 
          className={`p-2 text-center text-sm border ${aspectRatio === '1:1' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setAspectRatio('1:1')}
        >
          1:1
        </button>
        <button 
          className={`p-2 text-center text-sm border ${aspectRatio === '4:3' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setAspectRatio('4:3')}
        >
          4:3
        </button>
        <button 
          className={`p-2 text-center text-sm border ${aspectRatio === '16:9' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setAspectRatio('16:9')}
        >
          16:9
        </button>
        <button 
          className={`p-2 text-center text-sm border ${aspectRatio === '3:4' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setAspectRatio('3:4')}
        >
          3:4
        </button>
        <button 
          className={`p-2 text-center text-sm border ${aspectRatio === '9:16' ? 'border-amber-500' : 'border-gray-300'} rounded`}
          onClick={() => setAspectRatio('9:16')}
        >
          9:16
        </button>
      </div>
      
      <h4 className="font-medium mb-2">自定義比例</h4>
      <div className="flex gap-2 mb-4">
        <input 
          type="number" 
          placeholder="寬" 
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
        />
        <span className="flex items-center">:</span>
        <input 
          type="number" 
          placeholder="高" 
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
        />
      </div>
    </div>
  );
  
  // 渲染翻轉標籤內容
  const renderFlipTab = () => (
    <div>
      <h4 className="font-medium mb-2">旋轉</h4>
      <div className="flex gap-2 mb-4">
        <button 
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
          onClick={() => handleRotate(-90)}
        >
          <RotateCcw size={16} className="inline mr-1" />
          向左
        </button>
        <button 
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
          onClick={() => handleRotate(90)}
        >
          <RotateCw size={16} className="inline mr-1" />
          向右
        </button>
      </div>
      
      <h4 className="font-medium mb-2">翻轉</h4>
      <div className="flex gap-2 mb-4">
        <button 
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
          onClick={() => handleFlip('horizontal')}
        >
          <Maximize2 size={16} className="inline mr-1 transform rotate-90" />
          水平
        </button>
        <button 
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
          onClick={() => handleFlip('vertical')}
        >
          <Maximize2 size={16} className="inline mr-1" />
          垂直
        </button>
      </div>
      
      <h4 className="font-medium mb-2">自定義角度</h4>
      <div className="mb-4">
        <input 
          type="range" 
          min="-180" 
          max="180" 
          value="0"
          className="w-full mb-1"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>-180°</span>
          <span>0°</span>
          <span>180°</span>
        </div>
      </div>
    </div>
  );
  
  // 渲染調整標籤內容
  const renderAdjustTab = () => (
    <div>
      <div className="flex justify-between mb-4">
        <button 
          className="flex items-center text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
          onClick={handleAutoAdjustLocal}
          disabled={isProcessing}
        >
          <Zap size={14} className="mr-1" />
          自動調整
        </button>
        <button 
          className="flex items-center text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
          onClick={handleEnhanceQuality}
        >
          <Sliders size={14} className="mr-1" />
          提升畫質
        </button>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="text-sm">亮度</label>
          <span className="text-xs">{localBrightness}</span>
        </div>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value={localBrightness}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setLocalBrightness(value);
            handleBrightnessChange(value);
          }}
          className="w-full"
          disabled={isProcessing}
        />
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="text-sm">對比度</label>
          <span className="text-xs">{localContrast}</span>
        </div>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value={localContrast}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setLocalContrast(value);
            handleContrastChange(value);
          }}
          className="w-full"
          disabled={isProcessing}
        />
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="text-sm">陰影</label>
          <span className="text-xs">{shadows}</span>
        </div>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value={shadows}
          onChange={(e) => setShadows(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="text-sm">飽和度</label>
          <span className="text-xs">{localSaturation}</span>
        </div>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value={localSaturation}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setLocalSaturation(value);
            handleSaturationChange(value);
          }}
          className="w-full"
          disabled={isProcessing}
        />
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="text-sm">清晰度</label>
          <span className="text-xs">{localSharpness}</span>
        </div>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value={localSharpness}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setLocalSharpness(value);
            handleSharpnessChange(value);
          }}
          className="w-full"
          disabled={isProcessing}
        />
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <label className="text-sm">白平衡</label>
          <span className="text-xs">{whiteBalance}</span>
        </div>
        <input 
          type="range" 
          min="-100" 
          max="100" 
          value={whiteBalance}
          onChange={(e) => setWhiteBalance(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="flex gap-2 mb-4">
        <button 
          className="flex-1 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleResetAdjustments}
          disabled={isProcessing}
        >
          <RefreshCw size={14} className="inline mr-1" />
          重新調整
        </button>
        <button 
          className="flex-1 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700"
          onClick={applyAdjustments}
          disabled={isProcessing || (localBrightness === 0 && localContrast === 0 && localSaturation === 0 && localSharpness === 0)}
        >
          應用調整
        </button>
      </div>
    </div>
  );
  
  // 渲染濾鏡標籤內容
  const renderFilterTab = () => (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {filters.map(filter => (
          <div 
            key={filter.id}
            className={`flex flex-col items-center p-1 cursor-pointer ${selectedFilter === filter.id ? 'bg-gray-100 rounded' : ''}`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            <img src={filter.preview} alt={filter.name} className="w-full h-16 object-cover rounded mb-1" />
            <span className="text-xs">{filter.name}</span>
          </div>
        ))}
      </div>
      
      {selectedFilter && selectedFilter !== 'original' && (
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className="text-sm">濾鏡強度</label>
            <span className="text-xs">{filterStrength}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={filterStrength}
            onChange={(e) => setFilterStrength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">編輯</h3>
          <button 
            className="text-gray-500"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="flex mb-4 border-b border-gray-200">
          <button 
            className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'ratio' ? 'border-amber-500 font-medium' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('ratio')}
          >
            比例
          </button>
          <button 
            className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'flip' ? 'border-amber-500 font-medium' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('flip')}
          >
            翻轉
          </button>
          <button 
            className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'adjust' ? 'border-amber-500 font-medium' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('adjust')}
          >
            調整
          </button>
          <button 
            className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'filter' ? 'border-amber-500 font-medium' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('filter')}
          >
            濾鏡
          </button>
        </div>
        
        {activeTab === 'ratio' && renderRatioTab()}
        {activeTab === 'flip' && renderFlipTab()}
        {activeTab === 'adjust' && renderAdjustTab()}
        {activeTab === 'filter' && renderFilterTab()}
      </div>
    </div>
  );
};

export default EditPanel;
