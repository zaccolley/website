const instagramContainerElement = document.querySelector('#instagram-container')
const username = 'zaccolley'

fetch(`https://instascrape.glitch.me/${username}`)
  .then(response => response.json())
  .then(data => {
    if (!data || !data.posts || data.posts.length === 0) {
      return
    }

    instagramContainerElement.innerHTML = `
      <h2 class='post-heading'>
        Pictures from my Instagram
      </h2>
    `

    const postsListElement = document.createElement('ol')
    postsListElement.className = 'post-list'

    data.posts.forEach(post => {
      const postElement = document.createElement('li')
      postElement.className = 'post-container'
      const postLinkElement = document.createElement('a')
      postLinkElement.className = 'item post'

      postLinkElement.href = `https://www.instagram.com/p/${post.id}/`

      const image = new Image()
      image.className = 'post'
      image.src = post.image.url
      image.alt = post.caption

      postLinkElement.appendChild(image)
      postElement.appendChild(postLinkElement)
      postsListElement.appendChild(postElement)
    })

    instagramContainerElement.appendChild(postsListElement)
  })
  .catch(console.error)