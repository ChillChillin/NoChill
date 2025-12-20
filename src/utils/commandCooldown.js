"use strict";

const createCooldownTracker = ({ cooldownMs }) => {
  const buckets = new Map();

  const isOnCooldown = ({ commandName, userId }) => {
    const commandBucket = buckets.get(commandName);
    if (!commandBucket) {
      return false;
    }
    const lastUsedAt = commandBucket.get(userId);
    if (!lastUsedAt) {
      return false;
    }
    return Date.now() - lastUsedAt < cooldownMs;
  };

  const markUsed = ({ commandName, userId }) => {
    const commandBucket = buckets.get(commandName) || new Map();
    commandBucket.set(userId, Date.now());
    buckets.set(commandName, commandBucket);
  };

  return { isOnCooldown, markUsed };
};

module.exports = { createCooldownTracker };
