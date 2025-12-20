"use strict";

const GphApiClient = require("giphy-js-sdk-core");

const createGiphyService = (token) => {
  const client = GphApiClient(token);

  const searchGif = async (query) => {
    const response = await client.search("gifs", { q: query, limit: 10 });
    const totalResponses = response.data.length;
    if (!totalResponses) {
      return null;
    }
    const responseIndex = Math.floor(Math.random() * totalResponses);
    const responseFinal = response.data[responseIndex];
    return responseFinal.images.fixed_height.url;
  };

  return { searchGif };
};

module.exports = createGiphyService;
