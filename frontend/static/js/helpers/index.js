export const addOrRemoveActiveClass = location => {
  const links = document.querySelectorAll('.nav__link')

  links.forEach((link) => {    
    if (location === link.href && !link.classList.contains('active')) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}

export const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

export const getParams = match => {  
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}
