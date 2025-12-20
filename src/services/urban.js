"use strict";

const fetch = require("node-fetch");

const API_HOST = "api.urbandictionary.com";
const API_BASE = "https://api.urbandictionary.com/v0/define";
const REQUEST_TIMEOUT_MS = 5000;
const MAX_QUERY_LENGTH = 80;
const SAFE_QUERY_PATTERN = /^[a-zA-Z0-9\s'".,!?-]+$/;

const buildApiUrl = (query) => {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Empty Urban Dictionary query");
  }
  if (trimmed.length > MAX_QUERY_LENGTH) {
    throw new Error("Urban Dictionary query too long");
  }
  if (!SAFE_QUERY_PATTERN.test(trimmed)) {
    throw new Error("Urban Dictionary query contains unsupported characters");
  }

  const url = new URL(API_BASE);
  url.searchParams.set("term", trimmed);
  if (url.hostname !== API_HOST) {
    throw new Error("Unexpected Urban Dictionary host");
  }
  return url.toString();
};

const searchDefinition = async (query) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const url = buildApiUrl(query);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Urban Dictionary API error: ${response.status}`);
    }
    const payload = await response.json();
    return payload.list;
  } finally {
    clearTimeout(timeout);
  }
};

module.exports = { searchDefinition, buildApiUrl };
