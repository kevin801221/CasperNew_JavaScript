import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useImageContext } from '../../../contexts/ImageContext';

/**
 * 標尺設置面板組件
 * 用於設置標記尺的樣式和參數
 */
const RulerPanel = () => {
  const { 
    rulerStyle,
    setRulerStyle,
    rulerTab,
    setRulerTab,
    rulerValue,
    setRulerValue,
    rulerUnit,
    setRulerUnit,
    rulerPosition,
    setRulerPosition,
    rulerText,
    setRulerText,
    setActiveTool
  } = useImageContext();

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">樣式</h3>
          <button 
            className="text-gray-500"
            onClick={() => setActiveTool('')}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* 標尺樣式選擇 */}
          <div onClick={() => setRulerStyle(0)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 0 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-black"></div>
              <div className="w-2 h-2 bg-white border border-black rounded-full"></div>
              <div className="w-12 h-px bg-black"></div>
            </div>
            <div className="text-center text-xs mt-1">50 cm</div>
          </div>
          
          <div onClick={() => setRulerStyle(1)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 1 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-black"></div>
              <div className="h-2 border-l border-black"></div>
              <div className="w-12 h-px bg-black"></div>
            </div>
            <div className="text-center text-xs mt-1">50 cm</div>
          </div>
          
          <div onClick={() => setRulerStyle(2)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 2 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-black"></div>
              <div className="h-4 border-l border-black"></div>
              <div className="w-12 h-px bg-black"></div>
            </div>
            <div className="text-center text-xs mt-1">50 cm</div>
          </div>
          
          <div onClick={() => setRulerStyle(3)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 3 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-black"></div>
              <div className="h-2 border-l border-black border-dashed"></div>
              <div className="w-12 h-px bg-black"></div>
            </div>
            <div className="text-center text-xs mt-1">50 cm</div>
          </div>
          
          <div onClick={() => setRulerStyle(4)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 4 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-black"></div>
              <div className="border-l border-black h-3 mt-3"></div>
              <div className="w-12 h-px bg-black"></div>
            </div>
            <div className="text-center text-xs mt-1">meitu</div>
          </div>
          
          <div onClick={() => setRulerStyle(5)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 5 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-red-500"></div>
              <div className="border-l border-red-500 h-3 mt-3"></div>
              <div className="w-12 h-px bg-red-500"></div>
            </div>
            <div className="text-center text-xs mt-1 text-red-500">meitu</div>
          </div>
          
          <div onClick={() => setRulerStyle(6)} className={`border rounded p-2 cursor-pointer ${rulerStyle === 6 ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-12 h-px bg-blue-500"></div>
              <div className="border-l border-blue-500 h-3 mt-3"></div>
              <div className="w-12 h-px bg-blue-500"></div>
            </div>
            <div className="text-center text-xs mt-1 text-blue-500">meitu</div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">設定</h3>
          <div className="flex">
            <button 
              className={`flex-1 text-center py-1 border-b-2 ${rulerTab === '數值' ? 'border-amber-500 font-medium' : 'border-gray-200 text-gray-500'}`}
              onClick={() => setRulerTab('數值')}
            >
              數值
            </button>
            <button 
              className={`flex-1 text-center py-1 border-b-2 ${rulerTab === '自定義' ? 'border-amber-500 font-medium' : 'border-gray-200 text-gray-500'}`}
              onClick={() => setRulerTab('自定義')}
            >
              自定義
            </button>
          </div>
        </div>
        
        {rulerTab === '數值' ? (
          <div>
            <div className="mb-4">
              <div className="flex mb-2">
                <div className="relative w-full">
                  <input 
                    type="number" 
                    value={rulerValue}
                    onChange={(e) => setRulerValue(parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm block mb-1">單位</label>
              <div className="relative">
                <select 
                  value={rulerUnit}
                  onChange={(e) => setRulerUnit(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm appearance-none"
                >
                  <option>cm(公分)</option>
                  <option>m(公尺)</option>
                  <option>mm(毫米)</option>
                  <option>inch(吋)</option>
                </select>
                <div className="absolute right-2 top-2 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm block mb-1">位置</label>
              <div className="relative">
                <select 
                  value={rulerPosition}
                  onChange={(e) => setRulerPosition(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm appearance-none"
                >
                  <option>線條中間</option>
                  <option>線條上方</option>
                  <option>線條下方</option>
                </select>
                <div className="absolute right-2 top-2 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="text-sm block mb-1">文案</label>
              <input 
                type="text" 
                value={rulerText}
                onChange={(e) => setRulerText(e.target.value)}
                placeholder="請輸入自定義標記文字"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulerPanel;
