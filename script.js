const CANVAS_WIDTH = window.innerWidth * 0.25
const CANVAS_HEIGHT = CANVAS_WIDTH

function prepareCanvas(ctx) {
  ctx.fillStyle = `rgb(255,255,255)`
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

class Stroke {
  constructor() {
    this.lineWidth = Math.floor(Math.random() * 35) + 3

    this.x1 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y1 = Math.floor(Math.random() * CANVAS_HEIGHT)
    this.x2 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y2 = Math.floor(Math.random() * CANVAS_HEIGHT)

    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = `rgb(${this.r},${this.g},${this.b})`
    ctx.lineWidth = this.lineWidth
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke()
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

  draw(ctx) {
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`
    ctx.fillRect(this.x1, this.y1, this.x2, this.y2)
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

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`
    ctx.arc(this.x, this.y, this.radius, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}

class Paining {
  constructor(shapes) {
    this.shapes = shapes
  }

  draw(ctx) {
    prepareCanvas(ctx)
    this.shapes.forEach((shape) => shape.draw(ctx))
  }
}

function generatePainting() {
  shapes = []
  const n = Math.floor(Math.random() * 11) + 5
  for (let i = 0; i < n; i++) {
    const roll = Math.random()
    if (roll < 0.1) {
      shapes.push(new Square())
    } else if (roll < 0.2) {
      shapes.push(new Circle())
    } else {
      shapes.push(new Stroke())
    }
  }
  return new Paining(shapes)
}

function randomPainting(ctx) {
  const painting = generatePainting()
  painting.draw(ctx)
}

window.onload = function () {
  const canvas1 = document.getElementById("canvas1")
  const canvas2 = document.getElementById("canvas2")
  const canvas3 = document.getElementById("canvas3")

  const ctx1 = canvas1.getContext("2d")
  const ctx2 = canvas2.getContext("2d")
  const ctx3 = canvas3.getContext("2d")

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
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    ctx = canvas.getContext("2d")
    randomPainting(ctx)
  })
}
