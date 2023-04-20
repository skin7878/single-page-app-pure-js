import Dashboard from "./views/Dashboard.js"
import Posts from "./views/Posts.js"
import Settings from "./views/Settings.js"
import { addOrRemoveActiveClass } from './helpers/index.js'

const navigateTo = url => {
  history.pushState(null, null, url)
  router()  
}


const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    { path: '/settings', view: Settings }
  ]

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(match => match.isMatch)

  if(!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  }  
  
  const view = new match.route.view() 

  document.getElementById('app').innerHTML = await view.getHTML()    
}

window.addEventListener('popstate', () => {
  router()
  addOrRemoveActiveClass(location.href)
})

document.addEventListener('DOMContentLoaded', () => {  

  addOrRemoveActiveClass(location.href)

  document.body.addEventListener('click', e => {
    if(e.target.matches('[data-link]')) {
      e.preventDefault()

      addOrRemoveActiveClass(e.target.href)

      navigateTo(e.target.href)
    }
  })
  router()
})