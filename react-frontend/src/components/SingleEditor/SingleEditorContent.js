import React from 'react';
import { useImageContext } from '../../contexts/ImageContext';
import CanvasTools from './CanvasTools';
import CanvasPanel from './panels/CanvasPanel';
import BackgroundPanel from './panels/BackgroundPanel';
import GeneratedResultsPanel from './panels/GeneratedResultsPanel';
import RulerPanel from './panels/RulerPanel';
import TextPropertiesPanel from './panels/TextPropertiesPanel';
import ElementPanel from './panels/ElementPanel';
import UploadPanel from './panels/UploadPanel';
import EditCanvas from './EditCanvas';
import Toolbar from './Toolbar';
import ExtendedToolbar from './ExtendedToolbar';

/**
 * 單張編輯模式主要內容組件 (AI 商品圖-3)
 */
const SingleEditorContent = () => {
  const { 
    activeTool, 
    bgDesignMode,
    currentPage,
    currentMode
  } = useImageContext();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Toolbar />
      <ExtendedToolbar />
      
      <div className="flex flex-1 overflow-hidden">
        {activeTool === 'canvas' && <CanvasPanel />}
        {activeTool === 'background' && bgDesignMode === 'custom' && currentPage === 'singleEditor' && <BackgroundPanel />}
        {activeTool === 'background' && currentPage === 'singleEditorResult' && <GeneratedResultsPanel />}
        {activeTool === 'element' && <ElementPanel />}
        {activeTool === 'ruler' && <RulerPanel />}
        {activeTool === 'upload' && <UploadPanel />}
        
        <EditCanvas />
        
        {/* 右側屬性面板 */}
        {activeTool === 'text' && <TextPropertiesPanel />}
      </div>
    </div>
  );
};

export default SingleEditorContent;
