import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Dashboard')
  }

  async getHTML() {
    return `
      <h1>Hi User. You're at Home page.</h1>
      <p>
        <a href="/posts" data-link>View recent posts</a>
      </p>
    `
  }
}