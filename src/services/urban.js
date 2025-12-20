"use strict";

const fetch = require("node-fetch");

const searchDefinition = async (query) => {
  const response = await fetch(
    `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error(`Urban Dictionary API error: ${response.status}`);
  }
  const payload = await response.json();
  return payload.list;
};

module.exports = { searchDefinition };
