import AbstractView from './AbstractView.js'
import { getData } from '../api/index.js'

export default class extends AbstractView { 
  
  constructor(params) {
    super(params)
    this.setTitle('Posts')
    this.posts = []
    this.error = ''
  }

  async getPosts() {
    try {
      this.posts = await getData('https://jsonplaceholder.typicode.com/posts')
    } catch (error) {
      this.error = error
    }
  }

  async getHTML() {
    await this.getPosts()

    if (!this.posts.length && !this.error) return '<h1>No datas</h1>'
    if (this.error) return `<h1>Something went wrong! ${this.error}</h1>`

    return `      
      <h1>Welcome to the Posts page</h1>
      ${this.posts
        .map((post, index) => `<p><a href="/posts/${post.id}" data-link>${index + 1}) ${post.title.charAt(0).toUpperCase() + post.title.slice(1)}</a></p>`)
        .join('')}
      <p>
        <a href="/" data-link>Back Home</a>
      </p>
      <button class="btn">Add</button>
    `
  }
}
