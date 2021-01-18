function prepareCanvas(ctx, canvasWidth, canvasHeight) {
  ctx.fillStyle = `rgb(255,255,255)`
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

function drawStroke(ctx, stroke) {
  ctx.beginPath()
  ctx.strokeStyle = `rgb(${stroke.r},${stroke.g},${stroke.b})`
  ctx.lineWidth = stroke.lineWidth
  ctx.moveTo(stroke.x1, stroke.y1)
  ctx.lineTo(stroke.x2, stroke.y2)
  ctx.stroke()
}

function drawStrokes(ctx, strokes) {
  strokes.forEach((stroke) => {
    drawStroke(ctx, stroke)
  })
}

class Stroke {
  constructor(canvasWidth, canvasHeight) {
    this.lineWidth = Math.floor(Math.random() * 40) + 1

    this.x1 = Math.floor(Math.random() * canvasWidth)
    this.y1 = Math.floor(Math.random() * canvasHeight)
    this.x2 = Math.floor(Math.random() * canvasWidth)
    this.y2 = Math.floor(Math.random() * canvasHeight)

    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
  }
}

function generateStrokes(n, canvasWidth, canvasHeight) {
  const strokes = []
  for (let i = 0; i < n; i++) {
    const stroke = new Stroke(canvasWidth, canvasHeight)
    strokes.push(stroke)
  }
  return strokes
}

function generateCanvas(ctx, canvasWidth, canvasHeight) {
  prepareCanvas(ctx, canvasWidth, canvasHeight)
  const n = Math.floor(Math.random() * 21) + 5
  strokes = generateStrokes(n, canvasWidth, canvasHeight)
  drawStrokes(ctx, strokes)
}

window.onload = function () {
  const canvas1 = document.getElementById("canvas1")
  const canvas2 = document.getElementById("canvas2")
  const canvas3 = document.getElementById("canvas3")

  const ctx1 = canvas1.getContext("2d")
  const ctx2 = canvas2.getContext("2d")
  const ctx3 = canvas3.getContext("2d")

  const canvasWidth = window.innerWidth * 0.22
  const canvasHeight = canvasWidth

  canvas1.onclick = function () {
    generateCanvas(ctx2, canvasWidth, canvasHeight)
    generateCanvas(ctx3, canvasWidth, canvasHeight)
  }

  canvas2.onclick = function () {
    generateCanvas(ctx1, canvasWidth, canvasHeight)
    generateCanvas(ctx3, canvasWidth, canvasHeight)
  }

  canvas3.onclick = function () {
    generateCanvas(ctx1, canvasWidth, canvasHeight)
    generateCanvas(ctx2, canvasWidth, canvasHeight)
  }

  const canvases = [canvas1, canvas2, canvas3]

  canvases.forEach((canvas) => {
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx = canvas.getContext("2d")
    generateCanvas(ctx, canvasWidth, canvasHeight)
  })
}
