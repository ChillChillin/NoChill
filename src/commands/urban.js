"use strict";

const { searchDefinition } = require("../services/urban");

module.exports = {
  name: "urban",
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message, args }) {
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
      await message.channel.send(
        `Alright ya curious cunt, here ya go:\n${list[0].definition}`
      );
    } catch (error) {
      await message.channel.send(
        "Urban Dictionary is having a meltdown, ya unlucky cunt."
      );
      throw error;
    }
  },
};
