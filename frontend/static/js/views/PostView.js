import AbstractView from "./AbstractView.js"
import { getData } from '../api/index.js'

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.postId = params.id
        this.post        
        this.setTitle(`Post - ${this.postId}`)
    }

    async getPost() {
      try {
        this.post = await getData(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      } catch (error) {
        this.error = error
      }
    }

    async getHTML() {
        await this.getPost()

        return `
            <h1>${this.post.title.charAt(0).toUpperCase() + this.post.title.slice(1)}</h1>
            <p>${this.post.body.charAt(0).toUpperCase() + this.post.body.slice(1)}</p>
        `
    }
}