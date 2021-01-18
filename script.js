const CANVAS_WIDTH = window.innerWidth * 0.22
const CANVAS_HEIGHT = CANVAS_WIDTH

function prepareCanvas(ctx) {
  ctx.fillStyle = `rgb(255,255,255)`
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function drawStroke(ctx, stroke) {
  ctx.beginPath()
  ctx.strokeStyle = `rgb(${stroke.r},${stroke.g},${stroke.b})`
  ctx.lineWidth = stroke.lineWidth
  ctx.moveTo(stroke.x1, stroke.y1)
  ctx.lineTo(stroke.x2, stroke.y2)
  ctx.stroke()
}

function drawSquare(ctx, square) {
  ctx.fillStyle = `rgb(${square.r},${square.g},${square.b})`
  ctx.fillRect(square.x1, square.y1, square.x2, square.y2)
}

function drawCircle(ctx, circle) {
  ctx.beginPath()
  ctx.fillStyle = `rgb(${circle.r},${circle.g},${circle.b})`
  ctx.arc(circle.x, circle.y, circle.radius, circle.radius, 0, 2 * Math.PI)
  ctx.fill()
}

class Stroke {
  constructor() {
    this.lineWidth = Math.floor(Math.random() * 40) + 1

    this.x1 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y1 = Math.floor(Math.random() * CANVAS_HEIGHT)
    this.x2 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y2 = Math.floor(Math.random() * CANVAS_HEIGHT)

    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
  }
}

class Square {
  constructor() {
    this.size = Math.floor(Math.random() * 20) + 1

    this.x1 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y1 = Math.floor(Math.random() * CANVAS_HEIGHT)
    this.x2 = this.x1 + this.size
    this.y2 = this.y1 + this.size

    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
  }
}

class Circle {
  constructor() {
    this.radius = Math.floor(Math.random() * 100) + 1

    this.x = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y = Math.floor(Math.random() * CANVAS_HEIGHT)

    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
  }
}

class Paining {
  constructor(circles, strokes, squares) {
    this.circles = circles
    this.strokes = strokes
    this.squares = squares
  }
}

function generatePainting() {
  circles = []
  strokes = []
  squares = []
  const n = Math.floor(Math.random() * 11) + 5
  for (let i = 0; i < n; i++) {
    const roll = Math.random()
    if (roll < 0.1) {
      squares.push(new Square())
    } else if (roll < 0.2) {
      circles.push(new Circle())
    } else {
      strokes.push(new Stroke())
    }
  }
  return new Paining(circles, strokes, squares)
}

function drawPainting(ctx, painting) {
  prepareCanvas(ctx)
  painting.circles.forEach((circle) => drawCircle(ctx, circle))
  painting.squares.forEach((square) => drawSquare(ctx, square))
  painting.strokes.forEach((stroke) => drawStroke(ctx, stroke))
}

function randomPainting(ctx) {
  const painting = generatePainting()
  drawPainting(ctx, painting)
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
    randomPainting(ctx2)
    randomPainting(ctx3)
  }

  canvas2.onclick = function () {
    randomPainting(ctx1)
    randomPainting(ctx3)
  }

  canvas3.onclick = function () {
    randomPainting(ctx1)
    randomPainting(ctx2)
  }

  const canvases = [canvas1, canvas2, canvas3]

  canvases.forEach((canvas) => {
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx = canvas.getContext("2d")
    randomPainting(ctx)
  })
}
