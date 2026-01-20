/**
 * Pixel Art Utilities
 * مساعدات لعرض وتحسين صور فن البكسل
 */

/**
 * إنشاء صورة محارب بكسل آرت
 */
export const createWarriorPixelArt = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  
  // خلفية متدرجة ذهبية
  const gradient = ctx.createLinearGradient(0, 0, 128, 128)
  gradient.addColorStop(0, '#FFD700')
  gradient.addColorStop(0.5, '#FFA500')
  gradient.addColorStop(1, '#FF8C00')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  
  // رسم المحارب
  const px = 8 // حجم الكتلة
  
  // الرأس
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(5*px, 2*px, 6*px, 6*px)
  
  // الخوذة
  ctx.fillStyle = '#FF8C00'
  ctx.fillRect(4*px, 1*px, 8*px, 2*px)
  
  // العيون
  ctx.fillStyle = '#000'
  ctx.fillRect(6*px, 3*px, 1*px, 1*px)
  ctx.fillRect(9*px, 3*px, 1*px, 1*px)
  
  // الجسم
  ctx.fillStyle = '#FF4500'
  ctx.fillRect(5*px, 8*px, 6*px, 6*px)
  
  // الدرع
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(5*px, 8*px, 2*px, 6*px)
  ctx.fillRect(9*px, 8*px, 2*px, 6*px)
  
  // الأرجل
  ctx.fillStyle = '#000'
  ctx.fillRect(6*px, 14*px, 1*px, 2*px)
  ctx.fillRect(9*px, 14*px, 1*px, 2*px)
  
  // السيف
  ctx.fillStyle = '#C0C0C0'
  ctx.fillRect(11*px, 9*px, 1*px, 7*px)
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(11*px, 9*px, 1*px, 1*px)
  
  return canvas.toDataURL()
}

/**
 * إنشاء صورة قناص بكسل آرت
 */
export const createSniperPixelArt = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  
  // خلفية متدرجة بنفسجية
  const gradient = ctx.createLinearGradient(0, 0, 128, 128)
  gradient.addColorStop(0, '#9370DB')
  gradient.addColorStop(0.5, '#8A2BE2')
  gradient.addColorStop(1, '#4B0082')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  
  const px = 8
  
  // الرأس
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(5*px, 2*px, 6*px, 6*px)
  
  // القناع
  ctx.fillStyle = '#000'
  ctx.fillRect(4*px, 2*px, 8*px, 3*px)
  
  // العينان (الأحمر)
  ctx.fillStyle = '#FF0000'
  ctx.fillRect(6*px, 3*px, 1*px, 1*px)
  ctx.fillRect(9*px, 3*px, 1*px, 1*px)
  
  // الجسم الأسود
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(4*px, 8*px, 8*px, 7*px)
  
  // الحزام
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(4*px, 12*px, 8*px, 1*px)
  
  // الأرجل
  ctx.fillStyle = '#000'
  ctx.fillRect(5*px, 15*px, 1*px, 2*px)
  ctx.fillRect(10*px, 15*px, 1*px, 2*px)
  
  // البندقية
  ctx.fillStyle = '#C0C0C0'
  ctx.fillRect(12*px, 10*px, 1*px, 2*px)
  ctx.fillRect(13*px, 9*px, 1*px, 3*px)
  ctx.fillStyle = '#000'
  ctx.fillRect(14*px, 10*px, 1*px, 1*px)
  
  return canvas.toDataURL()
}

/**
 * إنشاء صورة وحش/تنين بكسل آرت
 */
export const createBeastPixelArt = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  
  // خلفية متدرجة زرقاء
  const gradient = ctx.createLinearGradient(0, 0, 128, 128)
  gradient.addColorStop(0, '#4169E1')
  gradient.addColorStop(0.5, '#1E90FF')
  gradient.addColorStop(1, '#0047AB')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  
  const px = 8
  
  // الرأس الكبير
  ctx.fillStyle = '#8B0000'
  ctx.fillRect(4*px, 1*px, 8*px, 7*px)
  
  // القرون
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(3*px, 0*px, 1*px, 2*px)
  ctx.fillRect(12*px, 0*px, 1*px, 2*px)
  
  // العيون الحمراء الضخمة
  ctx.fillStyle = '#FF0000'
  ctx.fillRect(6*px, 2*px, 2*px, 2*px)
  ctx.fillRect(10*px, 2*px, 2*px, 2*px)
  
  // الفم
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(5*px, 5*px, 6*px, 1*px)
  
  // الأسنان
  ctx.fillStyle = '#FFF'
  ctx.fillRect(5*px, 6*px, 1*px, 1*px)
  ctx.fillRect(7*px, 6*px, 1*px, 1*px)
  ctx.fillRect(9*px, 6*px, 1*px, 1*px)
  
  // الجسم الضخم
  ctx.fillStyle = '#8B0000'
  ctx.fillRect(2*px, 8*px, 12*px, 8*px)
  
  // الأشواك
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(3*px, 7*px, 1*px, 1*px)
  ctx.fillRect(6*px, 7*px, 1*px, 1*px)
  ctx.fillRect(9*px, 7*px, 1*px, 1*px)
  ctx.fillRect(12*px, 7*px, 1*px, 1*px)
  
  // الذيل
  ctx.fillStyle = '#8B0000'
  ctx.fillRect(13*px, 10*px, 2*px, 3*px)
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(14*px, 13*px, 1*px, 1*px)
  
  // الأرجل
  ctx.fillStyle = '#8B0000'
  ctx.fillRect(4*px, 16*px, 2*px, 1*px)
  ctx.fillRect(10*px, 16*px, 2*px, 1*px)
  
  return canvas.toDataURL()
}

/**
 * تحويل صورة عادية إلى صورة بكسل
 */
export const pixelateImage = (imageData, pixelSize = 8) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = imageData.width
  canvas.height = imageData.height
  
  // Draw original image
  ctx.putImageData(imageData, 0, 0)
  
  // Pixelate
  ctx.drawImage(
    canvas,
    0, 0, canvas.width, canvas.height,
    0, 0, canvas.width / pixelSize, canvas.height / pixelSize
  )
  
  ctx.drawImage(
    canvas,
    0, 0, canvas.width / pixelSize, canvas.height / pixelSize,
    0, 0, canvas.width, canvas.height
  )
  
  return canvas
}

/**
 * إنشاء صورة بكسل بسيطة من نص
 */
export const generatePixelArtFromText = (text, size = 100) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  
  // خلفية متدرجة
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#FF6B6B')
  gradient.addColorStop(0.5, '#4ECDC4')
  gradient.addColorStop(1, '#45B7D1')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  // نص
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 14px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, size / 2, size / 2)
  
  return canvas.toDataURL()
}

/**
 * تحميل صورة بكسل من الخادم
 */
export const loadPixelArt = async (url) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error loading pixel art:', error)
    return null
  }
}

/**
 * استخراج ألوان رئيسية من صورة
 */
export const extractPaletteFromImage = (imageElement, colors = 5) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = imageElement.width
  canvas.height = imageElement.height
  
  ctx.drawImage(imageElement, 0, 0)
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  const palette = []
  const step = Math.floor(data.length / colors)
  
  for (let i = 0; i < colors; i++) {
    const index = (i * step) * 4
    palette.push({
      r: data[index],
      g: data[index + 1],
      b: data[index + 2],
      hex: `#${data[index].toString(16).padStart(2, '0')}${data[index + 1].toString(16).padStart(2, '0')}${data[index + 2].toString(16).padStart(2, '0')}`
    })
  }
  
  return palette
}

/**
 * تطبيق تأثير بكسل باستخدام CSS
 */
export const pixelArtStyles = {
  container: {
    imageRendering: 'pixelated',
    imageRendering: 'crisp-edges',
    imageRendering: '-webkit-optimize-contrast',
    WebkitImageRendering: 'pixelated',
    MsInterpolationMode: 'nearest-neighbor'
  },
  
  pixelated: (size = 120) => ({
    width: size,
    height: size,
    imageRendering: 'pixelated',
    imageRendering: 'crisp-edges',
    border: '2px solid var(--accent)',
    borderRadius: '2px',
    backgroundColor: 'rgba(0,0,0,0.3)'
  }),
  
  glitch: {
    textShadow: '2px 2px 0px #FF006E, -2px -2px 0px #00D9FF, -2px 2px 0px #FFB703',
    fontWeight: 'bold',
    letterSpacing: '2px'
  },
  
  neon: {
    textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
    color: '#00ff00',
    fontWeight: 'bold'
  }
}

/**
 * إنشاء صورة بكسل عشوائية
 */
export const generateRandomPixelArt = (width = 16, height = 16, pixelSize = 8) => {
  const canvas = document.createElement('canvas')
  canvas.width = width * pixelSize
  canvas.height = height * pixelSize
  
  const ctx = canvas.getContext('2d')
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }
  }
  
  return canvas.toDataURL()
}

/**
 * إنشاء شبكة بكسل
 */
export const createPixelGrid = (width = 16, height = 16, pixelSize = 8) => {
  const canvas = document.createElement('canvas')
  canvas.width = width * pixelSize
  canvas.height = height * pixelSize
  
  const ctx = canvas.getContext('2d')
  
  // خلفية بيضاء
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // رسم شبكة
  ctx.strokeStyle = '#CCCCCC'
  ctx.lineWidth = 1
  
  for (let x = 0; x <= width; x++) {
    ctx.beginPath()
    ctx.moveTo(x * pixelSize, 0)
    ctx.lineTo(x * pixelSize, canvas.height)
    ctx.stroke()
  }
  
  for (let y = 0; y <= height; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * pixelSize)
    ctx.lineTo(canvas.width, y * pixelSize)
    ctx.stroke()
  }
  
  return canvas.toDataURL()
}
