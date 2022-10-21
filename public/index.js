const updateGame = ({ name, imageUrl, platforms }) => {
  document.querySelector('#cover').setAttribute('style', `background-image: url("${imageUrl}")`);
  document.querySelector('#name').textContent = name;
  
  platforms = platforms.map((platform) => platform.replace(/^Nintendo/, ''));
  
  document.querySelector('#platforms').textContent = platforms.join(' / ');
};

const run = async () => {
  const { pathname } = window.location;
  const gameName = decoceURI(pathname.slice(1));
  const response = await fetch(`/game/${gameName}`);
  const data = await response.json();
  updateGame(data);
};

document.addEventListener('DOMContentLoaded', run);
