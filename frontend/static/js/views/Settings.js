import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle('Settings')
  }

  async getHTML() {
    return `
      <h1>It's a Settings page</h1>
      <p>
        <a href="/" data-link>Back Home</a>
      </p>
    `
  }
}