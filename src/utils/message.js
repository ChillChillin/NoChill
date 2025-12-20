"use strict";

const clampMessage = (message, maxLength) => {
  if (!message || message.length <= maxLength) {
    return message;
  }
  return `${message.slice(0, Math.max(0, maxLength - 3))}...`;
};

module.exports = { clampMessage };
