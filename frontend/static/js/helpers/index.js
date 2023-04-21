export const addOrRemoveActiveClass = (location) => {
  const links = document.querySelectorAll('.nav__link')

  links.forEach((link) => {
    if (location === link.href && !link.classList.contains('active')) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}
