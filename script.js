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

  changePosition() {
    this.x1 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y1 = Math.floor(Math.random() * CANVAS_HEIGHT)
    this.x2 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y2 = Math.floor(Math.random() * CANVAS_HEIGHT)
  }

  changeColor() {
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

  draw(ctx) {
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`
    ctx.fillRect(this.x1, this.y1, this.x2, this.y2)
  }

  changePosition() {
    this.x1 = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y1 = Math.floor(Math.random() * CANVAS_HEIGHT)
    this.x2 = this.x1 + this.size
    this.y2 = this.y1 + this.size
  }

  changeColor() {
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

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`
    ctx.arc(this.x, this.y, this.radius, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  changePosition() {
    this.x = Math.floor(Math.random() * CANVAS_WIDTH)
    this.y = Math.floor(Math.random() * CANVAS_HEIGHT)
  }

  changeColor() {
    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
  }
}

class Painting {
  constructor(shapes) {
    this.shapes = [...shapes]
  }

  draw(ctx) {
    prepareCanvas(ctx)
    this.shapes.forEach((shape) => shape.draw(ctx))
  }

  mutate(ctx) {
    shuffleArray(this.shapes)
    prepareCanvas(ctx)
    for (let i = 0; i < this.shapes.length; i++) {
      const roll1 = Math.random()
      const roll2 = Math.random()
      const roll3 = Math.random()
      if (roll1 < 0.5) {
        this.shapes[i].changeColor()
      }
      if (roll2 < 0.2) {
        this.shapes[i].changePosition()
      }
      if (roll3 < 0.1) {
        this.shapes[i] = generateShape()
      }
      this.shapes[i].draw(ctx)
    }
  }
}

function generateShape() {
  const roll = Math.random()
  if (roll < 0.1) {
    return new Square()
  } else if (roll < 0.2) {
    return new Circle()
  } else {
    return new Stroke()
  }
}

function generatePainting() {
  shapes = []
  const n = Math.floor(Math.random() * 11) + 5
  for (let i = 0; i < n; i++) {
    const shape = generateShape()
    shapes.push(shape)
  }
  return new Painting(shapes)
}

function randomPainting(ctx) {
  const painting = generatePainting()
  painting.draw(ctx)
}

function randomize(canvases) {
  canvases.forEach((canvas) => {
    ctx = canvas.getContext("2d")
    randomPainting(ctx)
  })
}

window.onload = function () {
  const canvas1 = document.getElementById("canvas1")
  const canvas2 = document.getElementById("canvas2")
  const canvas3 = document.getElementById("canvas3")

  const ctx1 = canvas1.getContext("2d")
  const ctx2 = canvas2.getContext("2d")
  const ctx3 = canvas3.getContext("2d")

  let painting1 = generatePainting()
  let painting2 = generatePainting()
  let painting3 = generatePainting()

  canvas1.onclick = function () {
    painting2 = new Painting(painting1.shapes)
    painting3 = new Painting(painting1.shapes)
    painting2.mutate(ctx2)
    painting3.mutate(ctx3)
  }

  canvas2.onclick = function () {
    painting1 = new Painting(painting2.shapes)
    painting3 = new Painting(painting2.shapes)
    painting1.mutate(ctx1)
    painting3.mutate(ctx3)
  }

  canvas3.onclick = function () {
    painting1 = new Painting(painting3.shapes)
    painting2 = new Painting(painting3.shapes)
    painting1.mutate(ctx1)
    painting2.mutate(ctx2)
  }

  const canvases = [canvas1, canvas2, canvas3]

  canvases.forEach((canvas) => {
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
  })

  painting1.draw(ctx1)
  painting2.draw(ctx2)
  painting3.draw(ctx3)
}

function shuffleArray(array) {
  let curId = array.length
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId)
    curId -= 1
    let tmp = array[curId]
    array[curId] = array[randId]
    array[randId] = tmp
  }
}
