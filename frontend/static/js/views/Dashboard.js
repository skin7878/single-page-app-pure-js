import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle('Dashboard')
  }

  async getHTML() {
    return `
      <h1>Welcome back, Igor</h1>
      <p>
        <a href="/posts" data-link>View recent posts</a>
      </p>
    `
  }
}