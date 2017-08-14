
/** () => Promise of {data} */
const getGif = () => {

  const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    key: "dc6zaTOxFJmzC",
    tag: "cinema4d",
    type: "random"
  };

  const giphyURL = encodeURI(
    `${giphy.baseURL}${giphy.type}?api_key=${giphy.key}&tag=${giphy.tag}` // &rating=${giphy.rating}
  );

  return fetch(giphyURL).then(res => {  
    if (res.status !== 200) {  
      throw new Error('Looks like there was a problem. Status Code: ' +  
        res.status);   
    }
  
    return res.json();
  })
}

/** {data} => Image */
const loadGif = ({data}) => {
  const myimage = new Image();
  myimage.src = data.image_original_url;
  return myimage
}

/** Image => () */
const placeGif = image => {
  const images = document.getElementsByTagName('img');
  var l = images.length;
  for (var i = 0; i < l; i++) {
    images[0].parentNode.removeChild(images[0]);
  }

  document.body.appendChild(image);
}

/** resolves after (delay) milliseconds */
const hold = delay => data => new Promise((res, rej) => {
  setTimeout(() => res(data), delay)
})

/** resolves on music beat */ 
const musicHold = data => new Promise((res, rej) => {
  window.CHANNEL_LISTENERS[16] = () => {
    res(data)
  }
})

const playBeat = () => Promise
  .resolve()
  .then(getGif)
  .then(loadGif)
  .then(musicHold)
  .then(placeGif)
  .then(playBeat)

playBeat()

