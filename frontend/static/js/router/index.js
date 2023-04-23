import Dashboard from '../views/Dashboard.js'
import Posts from '../views/Posts.js'
import PostView from "../views/PostView.js"
import Settings from '../views/Settings.js'
import { pathToRegex, getParams } from '../helpers/index.js'

export const router = async () => {
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