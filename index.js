const handler = require('serve-handler');
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();

const rewriteData = ({ name, platforms, imageUrl }) => {
  const nintendo = platforms
    .filter((platform) => platform.includes('Nintendo'))
    .map((platform) => platform.replace(/^Nintendo /, ''));

  const sony = ['PlayStation ' + platforms
    .filter((platform) => platform.includes('PlayStation'))
    .map((platform) => platform.replace(/^PlayStation /, '')).join('|')];
  
  const xbox = ['Xbox ' + platforms
    .filter((platform) => platform.includes('Xbox'))
    .map((platform) => platform.replace(/^Xbox /, ''))
    .map((platform) => platform.replace('X/S', 'X|S'))
    .join('/')];
  
  platforms = platforms
    .filter((platform) => !platform.includes('Nintendo'))
    .filter((platform) => !platform.includes('PlayStation'))
    .filter((platform) => !platform.includes('Xbox'));

  platforms = [...platforms, ...nintendo, ...sony, ...xbox];
  return { name, platforms, imageUrl };
};

module.exports = async (req, res) => {
  const { url } = req;
  if (url.includes('/game/')) {
    const gameName = decodeURI(url.replace('/game/', ''));
    const [data] = await hltbService.search(gameName);
    res.end(JSON.stringify(rewriteData(data)));
  } else {
    await handler(req, res, {
      directoryListing: false,
      rewrites: [
        { source: "/*", "destination": "/" },
        { source: "/", "destination": "public/index.html" },
      ]
    });
  }
};
