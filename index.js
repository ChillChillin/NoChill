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

client.on("message", (message) => {
  //KICK MEMBERS
  if (message.content.startsWith(`${process.env.prefix}kick`)) {
    if (message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
      let member = message.mentions.members.first();
      member.kick().then((member) => {
        giphy
          .search("gifs", { q: "fail" })
          .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex =
              Math.floor(Math.random() * 10 + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            message.channel.send(
              `:middle_finger: ${member.displayName} just got the boot, ya filthy cunt. :middle_finger:`,
              {
                files: [responseFinal.images.fixed_height.url],
              }
            );
            console.log(files);
          })
          .catch(() => {
            message.channel.send(
              "Couldn’t kick that bastard. Discord’s being a useless cunt."
            );
          });
      });
    }
  }
  //FIND GIFS
  if (message.content.startsWith(`${process.env.prefix}gif`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      var actualgif = message.content.split("gif").pop();
      actualgif = actualgif.trim();
      giphy
        .search("gifs", { q: actualgif })
        .then((response) => {
          var totalResponses = response.data.length;
          var responseIndex =
            Math.floor(Math.random() * 10 + 1) % totalResponses;
          var responseFinal = response.data[responseIndex];
          message.channel.send({
            files: [responseFinal.images.fixed_height.url],
          });
        })
        .catch(() => {
          message.channel.send(
            "No gif for that, ya hopeless cunt. Try a real word."
          );
        });
    }
  }
  //SEND DM
  if (message.content.startsWith(`${process.env.prefix}dm`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        let guildMemeber = message.mentions.members.first();
        messageString = message.content.split(guildMemeber.id).pop();
        guildMemeber.send(
          `${message.member.user} says ${messageString} — delivered like a sneaky cunt.`
        );
        message.delete();
      } catch (err) {}
    }
  }
  //SHOW WHAT GAME THEY ARE PLAYING
  if (message.content.startsWith(`${process.env.prefix}game`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        let guildMemeber = message.mentions.members.first();
        var game = guildMemeber.presence.activities;
        if (game.toString() == "") {
          message.channel.send(
            `${guildMemeber} isn’t playing anything, lazy cunt.`
          );
        } else {
          message.channel.send(
            `${guildMemeber} is playing ${game.toString()} — try not to suck, cunt.`
          );
        }
      } catch (err) {}
    }
  }
  //Re-education camp (user request!)
  if (message.content.startsWith(`${process.env.prefix}re-education`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        message.channel.send(
          "Off to re-education, ya cooked cunt: https://www.youtube.com/watch?v=U06jlgpMtQs"
        );
      } catch (err) {}
    }
  }
  //SHOW USERS AVATAR
  if (message.content.startsWith(`${process.env.prefix}avatar`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      let user = message.mentions.users.first() || message.author;
      message.channel.send(
        `Here’s the mug, ya nosy cunt: https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
      );
    }
  }
  //SHOW The Finger!
  if (message.content.startsWith(`${process.env.prefix}finger`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      const attachment = new MessageAttachment(
        "https://i.imgur.com/biT8Si9.jpg"
      );
      message.channel.send("Cop this, ya rude cunt.", attachment);
    }
  }
  async function search(query) {
    const { list } = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${query}`
    ).then((response) => response.json());
    message.channel.send(`Alright ya curious cunt, here ya go:\n${list[0].definition}`);
  }

  cooldowns.markUsed({ commandName: command.name, userId: message.author.id });

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
