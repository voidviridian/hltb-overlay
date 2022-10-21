const handler = require('serve-handler');
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();

module.exports = async (req, res) => {
  const { url } = req;
  if (url.includes('/game/') {
    const gameName = decodeURI(url.replace('/game/', '');
    const [data] = await hltbService.search(gameName);
    res.end(JSON.stringify(data));
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
