import Dashboard from './views/Dashboard.js'
import Posts from './views/Posts.js'
import PostView from "./views/PostView.js"
import Settings from './views/Settings.js'
import { addOrRemoveActiveClass } from './helpers/index.js'

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

const navigateTo = (url) => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: '/settings', view: Settings },
  ]

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    }
  })

  let match = potentialMatches.find((match) => match.result)

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    }    
  }

  const view = new match.route.view(getParams(match))

  document.getElementById('app').innerHTML = await view.getHTML()
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
