const element = selector => document.querySelector(selector);
const modalAreaClasses = element('.modalArea').classList;
['.modalBg'].forEach(id =>
  element(id).onclick = () =>
    modalAreaClasses.toggle('is-show')
);
for (let fetchTimes = 0; fetchTimes++ < 20; fetchImages()) { }
setInterval(() => {
  const main = element('main')
  fetchImages().then(
    main.removeChild(main.firstElementChild)
  )
}, 1500);

// setInterval(() => window.scrollBy(0, 1), 5)

async function fetchImages() {
  const { url } = await fetch('https://api.waifu.pics/sfw/bully')
    .then(r => r.json())
    .catch(err => alert(err));

  const img = document.createElement('img');
  img.src = url;

  element('main').appendChild(img);
  img.onclick = () => {
    img.onclick = undefined;
    element('#modalBody')
      .replaceChild(
        img.cloneNode(true),
        element('#modalBody').firstChild
      );
    modalAreaClasses.toggle('is-show');
  };
}