"use client"

import { useEffect, useRef, useState } from 'react'
import { FaPen, FaEraser, FaDownload, FaTrash } from 'react-icons/fa6'

type DrawingTool = 'pen' | 'eraser'

interface Point {
  x: number
  y: number
}

export default function Drawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<DrawingTool>('pen')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(3)
  const [lastPos, setLastPos] = useState<Point | null>(null)

  // Colors matching the site's design system
  const colors = [
    '#000000', // black
    '#5294FF', // chart-1 blue
    '#FF4D50', // chart-2 red
    '#FACC00', // chart-3 yellow
    '#05E17A', // chart-4 green
    '#7A83FF', // chart-5 purple
    '#FFFFFF', // white
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Fill with white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Load saved drawing
      const saved = localStorage.getItem('drawing')
      if (saved) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
        }
        img.src = saved
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const dataUrl = canvas.toDataURL('image/png')
    localStorage.setItem('drawing', dataUrl)
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const pos = getPosition(e)
    setLastPos(pos)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const pos = getPosition(e)
    if (!lastPos) return

    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
    ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    setLastPos(pos)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setLastPos(null)
    saveDrawing()
  }

  const getPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    localStorage.removeItem('drawing')
  }

  const downloadDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `drawing-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Drawing Tools */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Tool Selection */}
          <div className="flex gap-2">
            <button
              onClick={() => setTool('pen')}
              className={`border-2 rounded-base px-4 py-2 font-base text-sm transition-all active:scale-95 inline-flex items-center gap-2 ${
                tool === 'pen'
                  ? 'bg-main text-main-foreground border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              <FaPen className="w-3 h-3" />
              Pen
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`border-2 rounded-base px-4 py-2 font-base text-sm transition-all active:scale-95 inline-flex items-center gap-2 ${
                tool === 'eraser'
                  ? 'bg-main text-main-foreground border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              <FaEraser className="w-3 h-3" />
              Eraser
            </button>
          </div>

          {/* Color Selection */}
          {tool === 'pen' && (
            <div className="flex gap-2 items-center">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-base border-2 transition-all hover:scale-110 active:scale-95 ${
                    color === c ? 'border-border shadow-shadow scale-110' : 'border-border/40'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          )}

          {/* Brush Size */}
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm w-8 font-medium">{brushSize}px</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={downloadDrawing}
            className="border-border shadow-shadow rounded-base border-2 px-4 py-2 font-base text-sm bg-background text-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <FaDownload className="w-3 h-3" />
            Save
          </button>
          <button
            onClick={clearCanvas}
            className="border-border shadow-shadow rounded-base border-2 px-4 py-2 font-base text-sm bg-destructive text-destructive-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <FaTrash className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="border-border shadow-shadow rounded-base bg-white border-2 p-0 overflow-hidden">
        <div className="relative w-full" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair bg-white"
            style={{ touchAction: 'none' }}
          />
          <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm border-2 border-border rounded-base px-3 py-1.5 text-xs text-foreground">
            Auto-saved locally
          </div>
        </div>
      </div>
    </div>
  )
}
