"use strict";

const { MessageAttachment } = require("discord.js");

module.exports = {
  name: "finger",
  allowDirectMessage: true,
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message }) {
    const attachment = new MessageAttachment(
      "https://i.imgur.com/biT8Si9.jpg"
    );
    await message.channel.send("Cop this, ya rude cunt.", attachment);
  },
};
