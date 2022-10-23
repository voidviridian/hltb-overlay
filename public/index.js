const updateGame = ({ name, imageUrl, platforms }) => {
  const cover = document.querySelector('#cover');
  const gameName = document.querySelector('#name')
  const platformsList = document.querySelector('#platforms');

  if (cover && gameName && platformsList) {
    cover.setAttribute('style', `background-image: url("${imageUrl}")`);
    gameName.textContent = name;
    platformsList.textContent = platforms.join(' • ');
  }
};

const run = async () => {
  const { pathname } = window.location;
  const gameName = decodeURI(pathname.slice(1));
  const response = await fetch(`/game/${gameName}`);
  const data = await response.json();
  updateGame(data);
};

document.addEventListener('DOMContentLoaded', run);
