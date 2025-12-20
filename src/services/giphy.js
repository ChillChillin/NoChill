"use strict";

const GphApiClient = require("giphy-js-sdk-core");

const MAX_QUERY_LENGTH = 80;
const SAFE_QUERY_PATTERN = /^[a-zA-Z0-9\s'".,!?-]+$/;
const REQUEST_TIMEOUT_MS = 5000;

const createGiphyService = (token) => {
  const client = GphApiClient(token);

  const sanitizeQuery = (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      throw new Error("Empty Giphy query");
    }
    if (trimmed.length > MAX_QUERY_LENGTH) {
      throw new Error("Giphy query too long");
    }
    if (!SAFE_QUERY_PATTERN.test(trimmed)) {
      throw new Error("Giphy query contains unsupported characters");
    }
    return trimmed;
  };

  const searchGif = async (query) => {
    const safeQuery = sanitizeQuery(query);
    const request = client.search("gifs", { q: safeQuery, limit: 10 });
    const response = await Promise.race([
      request,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Giphy request timed out")), REQUEST_TIMEOUT_MS)
      ),
    ]);

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
