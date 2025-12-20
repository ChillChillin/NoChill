"use strict";

const { Client } = require("discord.js");

require("dotenv").config();

const config = require("./src/config");
const logger = require("./src/logger");
const commands = require("./src/commands");
const createGiphyService = require("./src/services/giphy");
const { hasPermissions } = require("./src/utils/permissions");
const { createCooldownTracker } = require("./src/utils/commandCooldown");

const client = new Client();
const services = {
  giphy: createGiphyService(config.giphyToken),
};

const commandRegistry = new Map(
  commands.map((command) => [command.name, command])
);
const cooldowns = createCooldownTracker({ cooldownMs: config.cooldownMs });

const sendPermissionError = async (message) => {
  await message.channel.send("Nice try, but you’re not allowed, cunt.");
};

const sendCooldownError = async (message) => {
  await message.channel.send("Ease up, ya spammy cunt. Try again shortly.");
};

const sendCommandError = async (message) => {
  await message.channel.send("That one blew up. Try again later, cunt.");
};

client.once("ready", () => {
  logger.info("Bot running successfully!");
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(
    `Oi ${member}, welcome in ya cheeky cunt. Behave... or don't.`
  );
});

client.on("message", async (message) => {
  if (!message || message.author.bot) {
    return;
  }

  if (!message.content.startsWith(config.prefix)) {
    return;
  }

  const commandBody = message.content.slice(config.prefix.length).trim();
  if (!commandBody) {
    return;
  }

  const [commandName, ...args] = commandBody.split(/\s+/);
  const command = commandRegistry.get(commandName);
  if (!command) {
    return;
  }

  if (!message.guild && !command.allowDirectMessage) {
    await message.channel.send("That command stays in servers, ya cheeky cunt.");
    return;
  }

  if (message.guild && !hasPermissions(message.member, command.requiredPermissions)) {
    await sendPermissionError(message);
    return;
  }

  if (cooldowns.isOnCooldown({ commandName, userId: message.author.id })) {
    await sendCooldownError(message);
    return;
  }

  cooldowns.markUsed({ commandName, userId: message.author.id });

  try {
    await command.execute({ message, args, services, config });
  } catch (error) {
    logger.error(
      `Command failed: ${commandName} - ${error.message || error.toString()}`
    );
    await sendCommandError(message);
  }
});

process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled rejection: ${error.message || error.toString()}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught exception: ${error.message || error.toString()}`);
});

client.login(config.token);
