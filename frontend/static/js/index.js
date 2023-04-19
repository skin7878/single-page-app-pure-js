
const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}
import Dashboard from "./views/Dashboard.js"


const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    // { path: '/posts', view: () => console.log('Posts') },
    // { path: '/settings', view: () => console.log('Settings') }
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

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target.matches('[data-link]')) {
      e.preventDefault()     
      navigateTo(e.target.href)
    }
  })
  router()
})