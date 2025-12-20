"use strict";

const { searchDefinition } = require("../services/urban");
const { clampMessage } = require("../utils/message");

module.exports = {
  name: "urban",
  allowDirectMessage: true,
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message, args, config }) {
    const query = args.join(" ").trim();
    if (!query) {
      await message.channel.send("Give me a term to look up, ya daft cunt.");
      return;
    }

    try {
      const list = await searchDefinition(query);
      if (!list || list.length === 0) {
        await message.channel.send("No definition for that, ya lost cunt.");
        return;
      }
      const messageText = `Alright ya curious cunt, here ya go:\n${list[0].definition}`;
      await message.channel.send(
        clampMessage(messageText, config.maxMessageLength)
      );
    } catch (error) {
      await message.channel.send(
        "Urban Dictionary is having a meltdown, ya unlucky cunt."
      );
      throw error;
    }
  },
};
