const apiUrl = 'https://api.waifu.pics/sfw/bully';

const getElement = selector => document.querySelector(selector);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const modalAreaClasses = getElement('.modalArea').classList;
const header = getElement('header');

['.closeModal', '.modalBg']
  .map(selector => getElement(selector))
  .forEach(element =>
    element.onclick = event => {
      if (element === event.target)
        modalAreaClasses.toggle('is-show')
    }
  );

header.onclick = () => {
  header.classList.toggle('topHeader');
  header.classList.toggle('centerHeader');
};

console.time('preFetchImagesCall');
for (let fetchTimes = 0; fetchTimes++ <= 32; fetchImages())
  console.timeLog('preFetchImagesCall');
console.timeEnd('preFetchImagesCall');

const updateDom = setInterval(async () => {
  const main = getElement('main');
  const img = main.firstChild;
  await fetchImages();
  img.style.transition = 'ease-in-out .2s';
  img.style.opacity = 0;
  await sleep(200)
  main.removeChild(img)
}, 2000);

const stop = () => clearInterval(updateDom);

async function fetchImages() {
  const { url } = await fetch(apiUrl)
    .then(r => r.json())
    .catch(err => {
      alert(`${err}\nvamos parar de atualizar as imagens :(`);
      stop();
    });

  const img = document.createElement('img');
  img.src = url;

  img.onclick = () => {
    getElement('.modalContent>img').src = url;
    modalAreaClasses.toggle('is-show');
  };
  
  getElement('main').appendChild(img);
}