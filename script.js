
const getGif = () => {
  // Giphy API defaults
  const giphy = {
      baseURL: "https://api.giphy.com/v1/gifs/",
      key: "dc6zaTOxFJmzC",
      tag: "trippy",
      type: "random",
      rating: "pg-13"
  };

  const giphyURL = encodeURI(
    `${giphy.baseURL}${giphy.type}?api_key=${giphy.key}&tag=${giphy.tag}&rating=${giphy.rating}`
  );

  return fetch(giphyURL).then(res => {  
    if (res.status !== 200) {  
      throw new Error('Looks like there was a problem. Status Code: ' +  
        res.status);   
    }
  
    return res.json();
  })
}

const loadGif ({data}) => {
  const myimage = new Image();
  myimage.src = data.image_original_url;
}

const displayGif =({data}) => {
  const CONTAINER = document.getElementById("gif");
  CONTAINER.style["background-image"] = 'url("' + data.image_original_url + '")';
}

const hold = delay => data => new Promise((res, rej) => {
  console.log('holding')
  setTimeout(() => res(data), delay)
})


// getGif()
// .then(hold(3000))
// .then(displayGif)
// .then(getGif)
// .then(hold(3000))
// .then(displayGif)

window.CHANNEL_LISTENERS[16] = () => {
  getGif()
  .then(displayGif)
}