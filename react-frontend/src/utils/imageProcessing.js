/**
 * 前端圖片處理功能
 * 提供可直接在前端運行的圖片處理函數，包括旋轉、翻轉、亮度調整等
 */

/**
 * 將 Image 對象繪製到 Canvas 上並返回 Canvas
 * @param {HTMLImageElement} image - 圖片元素
 * @param {number} width - Canvas 寬度，默認為圖片寬度
 * @param {number} height - Canvas 高度，默認為圖片高度
 * @returns {HTMLCanvasElement} Canvas 元素
 */
const imageToCanvas = (image, width = image.width, height = image.height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    return canvas;
  };
  
  /**
   * 加載圖片URL為 Image 對象
   * @param {string} url - 圖片URL
   * @returns {Promise<HTMLImageElement>} Image 對象
   */
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 處理跨域圖片
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = url;
    });
  };
  
  /**
   * 旋轉圖片
   * @param {string} imageUrl - 圖片URL
   * @param {number} degrees - 旋轉角度(90, -90, 180等)
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const rotateImage = async (imageUrl, degrees) => {
    try {
      const img = await loadImage(imageUrl);
      
      // 計算旋轉後的尺寸
      let width = img.width;
      let height = img.height;
      
      // 如果旋轉90或-90度，則寬高互換
      if (Math.abs(degrees) % 180 === 90) {
        [width, height] = [height, width];
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // 移動到Canvas中心
      ctx.translate(width / 2, height / 2);
      
      // 旋轉Canvas
      ctx.rotate((degrees * Math.PI) / 180);
      
      // 繪製圖片，注意因為旋轉，需要偏移位置
      if (Math.abs(degrees) % 180 === 90) {
        ctx.drawImage(img, -height / 2, -width / 2);
      } else {
        ctx.drawImage(img, -width / 2, -height / 2);
      }
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('旋轉圖片失敗:', error);
      throw error;
    }
  };
  
  /**
   * 翻轉圖片
   * @param {string} imageUrl - 圖片URL
   * @param {string} direction - 翻轉方向 ('horizontal' 或 'vertical')
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const flipImage = async (imageUrl, direction) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 根據方向進行翻轉
      if (direction === 'horizontal') {
        ctx.translate(img.width, 0);
        ctx.scale(-1, 1);
      } else if (direction === 'vertical') {
        ctx.translate(0, img.height);
        ctx.scale(1, -1);
      }
      
      ctx.drawImage(img, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('翻轉圖片失敗:', error);
      throw error;
    }
  };
  
  /**
   * 調整圖片亮度
   * @param {string} imageUrl - 圖片URL
   * @param {number} brightness - 亮度調整值 (-100 到 100)
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const adjustBrightness = async (imageUrl, brightness) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製原始圖片
      ctx.drawImage(img, 0, 0);
      
      // 獲取圖像數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 計算亮度調整值(轉換為-255到255範圍)
      const brightnessValue = Math.floor(brightness * 2.55);
      
      // 調整每個像素的亮度
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + brightnessValue));       // 紅
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightnessValue)); // 綠
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightnessValue)); // 藍
      }
      
      // 將調整後的數據放回Canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('調整亮度失敗:', error);
      throw error;
    }
  };
  
  /**
   * 調整圖片對比度
   * @param {string} imageUrl - 圖片URL
   * @param {number} contrast - 對比度調整值 (-100 到 100)
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const adjustContrast = async (imageUrl, contrast) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製原始圖片
      ctx.drawImage(img, 0, 0);
      
      // 獲取圖像數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 計算對比度因子(轉換為0.01到3範圍)
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      
      // 調整每個像素的對比度
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));       // 紅
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128)); // 綠
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128)); // 藍
      }
      
      // 將調整後的數據放回Canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('調整對比度失敗:', error);
      throw error;
    }
  };
  
  /**
   * 調整圖片飽和度
   * @param {string} imageUrl - 圖片URL
   * @param {number} saturation - 飽和度調整值 (-100 到 100)
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const adjustSaturation = async (imageUrl, saturation) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製原始圖片
      ctx.drawImage(img, 0, 0);
      
      // 獲取圖像數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 計算飽和度調整值(轉換為0到2範圍，1為原始飽和度)
      const saturationFactor = 1 + saturation / 100;
      
      // 調整每個像素的飽和度
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // 計算灰度值
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        
        // 調整顏色
        data[i] = Math.min(255, Math.max(0, gray + saturationFactor * (r - gray)));
        data[i + 1] = Math.min(255, Math.max(0, gray + saturationFactor * (g - gray)));
        data[i + 2] = Math.min(255, Math.max(0, gray + saturationFactor * (b - gray)));
      }
      
      // 將調整後的數據放回Canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('調整飽和度失敗:', error);
      throw error;
    }
  };
  
  /**
   * 調整圖片銳利度
   * @param {string} imageUrl - 圖片URL
   * @param {number} sharpness - 銳利度調整值 (0 到 100)
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const adjustSharpness = async (imageUrl, sharpness) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製原始圖片
      ctx.drawImage(img, 0, 0);
      
      // 如果銳利度為0，直接返回原圖
      if (sharpness === 0) {
        return canvas.toDataURL('image/png');
      }
      
      // 獲取圖像數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;
      
      // 創建一個拷貝，用於計算銳化
      const tempData = new Uint8ClampedArray(data);
      
      // 卷積核係數(銳化強度)
      const sharpenFactor = sharpness / 100 * 0.5;
      
      // 應用拉普拉斯銳化卷積
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          
          for (let c = 0; c < 3; c++) {
            // 中心像素
            const centerValue = tempData[idx + c];
            
            // 周圍像素
            const topValue = tempData[idx - width * 4 + c];
            const bottomValue = tempData[idx + width * 4 + c];
            const leftValue = tempData[idx - 4 + c];
            const rightValue = tempData[idx + 4 + c];
            
            // 計算拉普拉斯算子: 中心像素值*5 - 周圍四個像素值
            const laplacian = centerValue * 5 - (topValue + bottomValue + leftValue + rightValue);
            
            // 將拉普拉斯值按比例添加到原始值
            const newValue = centerValue + laplacian * sharpenFactor;
            
            // 確保值在0-255範圍內
            data[idx + c] = Math.min(255, Math.max(0, newValue));
          }
        }
      }
      
      // 將調整後的數據放回Canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('調整銳利度失敗:', error);
      throw error;
    }
  };
  
  /**
   * 同時應用多種調整
   * @param {string} imageUrl - 圖片URL
   * @param {Object} adjustments - 調整參數對象
   * @param {number} [adjustments.brightness] - 亮度調整
   * @param {number} [adjustments.contrast] - 對比度調整
   * @param {number} [adjustments.saturation] - 飽和度調整
   * @param {number} [adjustments.sharpness] - 銳利度調整
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const applyImageAdjustments = async (imageUrl, adjustments) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製原始圖片
      ctx.drawImage(img, 0, 0);
      
      // 獲取圖像數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 亮度調整
      if (adjustments.brightness !== undefined) {
        const brightnessValue = Math.floor(adjustments.brightness * 2.55);
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, data[i] + brightnessValue));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightnessValue));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightnessValue));
        }
      }
      
      // 對比度調整
      if (adjustments.contrast !== undefined) {
        const factor = (259 * (adjustments.contrast + 255)) / (255 * (259 - adjustments.contrast));
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
          data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
          data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
        }
      }
      
      // 飽和度調整
      if (adjustments.saturation !== undefined) {
        const saturationFactor = 1 + adjustments.saturation / 100;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
          
          data[i] = Math.min(255, Math.max(0, gray + saturationFactor * (r - gray)));
          data[i + 1] = Math.min(255, Math.max(0, gray + saturationFactor * (g - gray)));
          data[i + 2] = Math.min(255, Math.max(0, gray + saturationFactor * (b - gray)));
        }
      }
      
      // 將調整後的數據放回Canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 如果有銳利度調整，需要單獨處理
      if (adjustments.sharpness !== undefined && adjustments.sharpness > 0) {
        // 獲取當前Canvas的Data URL
        const currentImageUrl = canvas.toDataURL('image/png');
        
        // 應用銳利度調整
        return await adjustSharpness(currentImageUrl, adjustments.sharpness);
      }
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('應用圖片調整失敗:', error);
      throw error;
    }
  };
  
  /**
   * 圖片裁切功能
   * @param {string} imageUrl - 圖片URL
   * @param {Object} cropParams - 裁切參數
   * @param {number} cropParams.x - 裁切區域左上角x坐標
   * @param {number} cropParams.y - 裁切區域左上角y坐標
   * @param {number} cropParams.width - 裁切區域寬度
   * @param {number} cropParams.height - 裁切區域高度
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const cropImage = async (imageUrl, cropParams) => {
    try {
      const img = await loadImage(imageUrl);
      
      // 確保裁切區域在圖片範圍內
      const x = Math.max(0, Math.min(img.width, cropParams.x));
      const y = Math.max(0, Math.min(img.height, cropParams.y));
      const width = Math.max(1, Math.min(img.width - x, cropParams.width));
      const height = Math.max(1, Math.min(img.height - y, cropParams.height));
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // 裁切並繪製圖片
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('裁切圖片失敗:', error);
      throw error;
    }
  };
  
  /**
   * 應用邊角圓角
   * @param {string} imageUrl - 圖片URL
   * @param {number} radius - 圓角半徑(統一四個角)
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const applyBorderRadius = async (imageUrl, radius) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製圓角矩形
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(canvas.width - radius, 0);
      ctx.arcTo(canvas.width, 0, canvas.width, radius, radius);
      ctx.lineTo(canvas.width, canvas.height - radius);
      ctx.arcTo(canvas.width, canvas.height, canvas.width - radius, canvas.height, radius);
      ctx.lineTo(radius, canvas.height);
      ctx.arcTo(0, canvas.height, 0, canvas.height - radius, radius);
      ctx.lineTo(0, radius);
      ctx.arcTo(0, 0, radius, 0, radius);
      ctx.closePath();
      
      // 設置裁切區域
      ctx.clip();
      
      // 繪製圖片
      ctx.drawImage(img, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('應用圓角失敗:', error);
      throw error;
    }
  };
  
  /**
   * 應用個別圓角
   * @param {string} imageUrl - 圖片URL
   * @param {Object} radiusParams - 圓角參數
   * @param {number} radiusParams.topLeft - 左上圓角半徑
   * @param {number} radiusParams.topRight - 右上圓角半徑
   * @param {number} radiusParams.bottomLeft - 左下圓角半徑
   * @param {number} radiusParams.bottomRight - 右下圓角半徑
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const applyIndividualBorderRadius = async (imageUrl, radiusParams) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 解構圓角參數
      const { topLeft, topRight, bottomLeft, bottomRight } = radiusParams;
      
      // 繪製圓角矩形
      ctx.beginPath();
      // 左上角到右上角
      ctx.moveTo(topLeft, 0);
      ctx.lineTo(canvas.width - topRight, 0);
      ctx.arcTo(canvas.width, 0, canvas.width, topRight, topRight);
      
      // 右上角到右下角
      ctx.lineTo(canvas.width, canvas.height - bottomRight);
      ctx.arcTo(canvas.width, canvas.height, canvas.width - bottomRight, canvas.height, bottomRight);
      
      // 右下角到左下角
      ctx.lineTo(bottomLeft, canvas.height);
      ctx.arcTo(0, canvas.height, 0, canvas.height - bottomLeft, bottomLeft);
      
      // 左下角到左上角
      ctx.lineTo(0, topLeft);
      ctx.arcTo(0, 0, topLeft, 0, topLeft);
      
      ctx.closePath();
      
      // 設置裁切區域
      ctx.clip();
      
      // 繪製圖片
      ctx.drawImage(img, 0, 0);
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('應用個別圓角失敗:', error);
      throw error;
    }
  };
  
  /**
   * 應用邊框
   * @param {string} imageUrl - 圖片URL
   * @param {Object} borderParams - 邊框參數
   * @param {number} borderParams.width - 邊框寬度
   * @param {string} borderParams.color - 邊框顏色
   * @param {string} borderParams.style - 邊框樣式('solid', 'dashed', 'dotted')
   * @returns {Promise<string>} 處理後的圖片Data URL
   */
  export const applyBorder = async (imageUrl, borderParams) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      // 增加畫布尺寸以容納邊框
      canvas.width = img.width + borderParams.width * 2;
      canvas.height = img.height + borderParams.width * 2;
      const ctx = canvas.getContext('2d');
      
      // 清除畫布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 繪製圖片
      ctx.drawImage(img, borderParams.width, borderParams.width);
      
      // 設置邊框樣式
      ctx.strokeStyle = borderParams.color;
      ctx.lineWidth = borderParams.width;
      
      // 根據邊框樣式設置線條樣式
      if (borderParams.style === 'dashed') {
        ctx.setLineDash([borderParams.width * 2, borderParams.width]);
      } else if (borderParams.style === 'dotted') {
        ctx.setLineDash([borderParams.width, borderParams.width]);
      }
      
      // 繪製邊框
      ctx.strokeRect(
        borderParams.width / 2, 
        borderParams.width / 2, 
        canvas.width - borderParams.width, 
        canvas.height - borderParams.width
      );
      
      // 轉換為Data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('應用邊框失敗:', error);
      throw error;
    }
  };
  
  /**
   * 自動調整參數函數
   * 根據圖片自動增強亮度、對比度等
   * @param {string} imageUrl - 圖片URL
   * @returns {Promise<Object>} 自動調整的參數值
   */
  export const autoAdjustParams = async (imageUrl) => {
    try {
      const img = await loadImage(imageUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 繪製圖片
      ctx.drawImage(img, 0, 0);
      
      // 獲取圖像數據
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 計算亮度、對比度等
      let totalR = 0, totalG = 0, totalB = 0;
      let minR = 255, minG = 255, minB = 255;
      let maxR = 0, maxG = 0, maxB = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        totalR += r;
        totalG += g;
        totalB += b;
        
        minR = Math.min(minR, r);
        minG = Math.min(minG, g);
        minB = Math.min(minB, b);
        
        maxR = Math.max(maxR, r);
        maxG = Math.max(maxG, g);
        maxB = Math.max(maxB, b);
      }
      
      const pixelCount = data.length / 4;
      
      // 計算平均值
      const avgR = totalR / pixelCount;
      const avgG = totalG / pixelCount;
      const avgB = totalB / pixelCount;
      
      // 計算亮度平均值 (0-100)
      const avgBrightness = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB) / 2.55;
      
      // 計算對比度 (0-100)
      const avgContrast = ((maxR + maxG + maxB) / 3 - (minR + minG + minB) / 3) / 2.55;
      
      // 基於圖片特性自動設置參數
      const brightnessAdjustment = 50 - avgBrightness;
      const contrastAdjustment = Math.min(20, Math.max(-20, (50 - avgContrast) * 0.5));
      const saturationAdjustment = 10;  // 適度增加飽和度
      const sharpnessAdjustment = 15;   // 適度增加銳利度
      
      return {
        brightness: Math.round(brightnessAdjustment),
        contrast: Math.round(contrastAdjustment),
        saturation: saturationAdjustment,
        sharpness: sharpnessAdjustment
      };
    } catch (error) {
      console.error('自動調整參數失敗:', error);
      // 返回默認值
      return {
        brightness: 5,
        contrast: 5,
        saturation: 10,
        sharpness: 15
      };
    }
  };