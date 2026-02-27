;(function(){
  function collectLinks() {
    return Array.prototype.slice.apply(
      document.head.querySelectorAll('link[rel*="icon"]')
    )
  }

  function applyLink(source, target) {
    target.setAttribute('type', source.getAttribute('type'))
    target.setAttribute('href', source.getAttribute('href'))
  }

  function initSwitcher() {
    if (typeof window.matchMedia !== 'function') {
      return
    }

    var links = collectLinks()
    var current = document.createElement('link')
    current.setAttribute('rel', 'shortcut icon')
    document.head.appendChild(current)

    function applyMatchedFavicon() {
      var matched
      links.forEach(function(link) {
        if (window.matchMedia(link.media).matches) {
          matched = link
        }
      })
      if (matched) {
        applyLink(matched, current)
      }
    }

    applyMatchedFavicon()
    links.forEach(function(link) {
      document.head.removeChild(link)
    })

    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (darkQuery.addEventListener) {
      darkQuery.addEventListener('change', applyMatchedFavicon)
    } else if (darkQuery.addListener) {
      darkQuery.addListener(applyMatchedFavicon)
    }
  }

  initSwitcher()
})()
