"use strict";

const requiredEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

module.exports = {
  prefix: process.env.prefix || "!",
  token: requiredEnv("token"),
  giphyToken: requiredEnv("giphyToken"),
};
