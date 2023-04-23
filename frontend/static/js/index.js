import { addOrRemoveActiveClass } from './helpers/index.js'
import { router } from './router/index.js'

const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', () => {
  router()
  addOrRemoveActiveClass(location.href)
})

document.addEventListener('DOMContentLoaded', () => {
  addOrRemoveActiveClass(location.href)

  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()

      addOrRemoveActiveClass(e.target.href)

      navigateTo(e.target.href)
    }
  })
  router()
})
