import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 生成結果面板組件
 * 用於顯示 AI 生成的背景結果
 */
const GeneratedResultsPanel = () => {
  const { 
    generatedResults,
    setActiveTool,
    handleSelectGeneratedBackground
  } = useImageContext();

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button 
            className="text-gray-700 font-medium flex items-center"
            onClick={() => setActiveTool('background')}
          >
            <ArrowLeft size={16} className="mr-1" />
            生成結果
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {generatedResults.map((img, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer"
              onClick={() => handleSelectGeneratedBackground(index)}
            >
              <img 
                src={img} 
                alt={`生成結果 ${index + 1}`} 
                className="w-full h-24 object-cover rounded border border-transparent group-hover:border-blue-500" 
              />
              <div className="absolute top-2 left-2">
                {index === 0 && (
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="w-full py-2 bg-gray-200 text-gray-700 rounded mb-2"
          onClick={() => handleGenerateMoreBackgrounds()}
        >
          生成更多內容
        </button>
        
        <button 
          className="w-full py-2 bg-red-500 text-white rounded"
          onClick={() => handleRegenerateBackgrounds()}
        >
          重新生成
        </button>
      </div>
    </div>
  );
};

export default GeneratedResultsPanel;
