export const addOrRemoveActiveClass = (location) => {
  const links = document.querySelectorAll('.nav__link')

  links.forEach((link) => {    
    if (location.split('/')[3] === link.href.split('/')[3] && !link.classList.contains('active')) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}
