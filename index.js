"use strict";

const { Client } = require("discord.js");

require("dotenv").config();

const config = require("./src/config");
const logger = require("./src/logger");
const commands = require("./src/commands");
const createGiphyService = require("./src/services/giphy");
const { hasPermissions } = require("./src/utils/permissions");

const client = new Client();
const services = {
  giphy: createGiphyService(config.giphyToken),
};

const commandRegistry = new Map(
  commands.map((command) => [command.name, command])
);

const sendPermissionError = async (message) => {
  await message.channel.send("Nice try, but you’re not allowed, cunt.");
};

client.once("ready", () => {
  logger.info("Bot running successfully!");
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(`Oi ${member}, welcome in ya cheeky cunt. Behave... or don't.`);
});

client.on("message", async (message) => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) {
    return;
  }

  const input = message.content.slice(config.prefix.length).trim();
  if (!input) {
    return;
  }

  const [commandName, ...args] = input.split(/\s+/);
  const command = commandRegistry.get(commandName.toLowerCase());
  if (!command) {
    return;
  }

  if (!hasPermissions(message.member, command.requiredPermissions)) {
    await sendPermissionError(message);
    return;
  }

  try {
    await command.execute({ message, args, services });
  } catch (error) {
    logger.error(
      `Command failed: ${commandName} - ${error.message || error.toString()}`
    );
  }
});

process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled rejection: ${error.message || error.toString()}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught exception: ${error.message || error.toString()}`);
});

client.login(config.token);
