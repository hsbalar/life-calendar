export default class Color {
  constructor({ red = 0, green = 0, blue = 0 } = {}) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  formatToTwoDigits(input) {
    return input.length < 2 ? `0${input}` : input
  }

  toHex(input) {
    const rgb = input || this
    return `#${Object.values(rgb)
      .map((x) => this.formatToTwoDigits(x.toString(16)))
      .join('')}`
  }

  getShades(input) {
    const { red, green, blue } = this
    let [left, right] = [
      Math.min(red, green, blue),
      Math.min(255 - red, 255 - green, 255 - blue),
    ]
    const count = Number(input)
    const shades = new Array(count).fill(this.toHex())

    if (left < 1 && right < 1) {
      return shades
    }

    let leftLimit = Math.min(left, Math.ceil(count / 2))
    let rightLimit = Math.min(right, Math.ceil(count / 2))

    if (leftLimit < Math.ceil(count / 2)) {
      rightLimit += Math.ceil(count / 2) - leftLimit
    } else if (rightLimit < Math.ceil(count / 2)) {
      leftLimit += Math.ceil(count / 2) - rightLimit
    }

    for (let i = leftLimit; i > 0; i--) {
      shades[i - 1] = this.toHex({
        red: Math.ceil(red - (i * left) / leftLimit),
        green: Math.ceil(green - (i * left) / leftLimit),
        blue: Math.ceil(blue - (i * left) / leftLimit),
      })
    }
    for (let i = rightLimit; i > 0; i--) {
      shades[leftLimit + i - 1] = this.toHex({
        red: Math.ceil(red + (i * right) / rightLimit),
        green: Math.ceil(green + (i * right) / rightLimit),
        blue: Math.ceil(blue + (i * right) / rightLimit),
      })
    }

    shades.length = input // restrict shades to be no more than input
    return shades.sort()
  }
}
