"use strict";

module.exports = {
  name: "dm",
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message, args }) {
    const member = message.mentions.members.first();
    if (!member) {
      await message.channel.send("Tag someone to DM, ya sneaky cunt.");
      return;
    }

    const text = args.slice(1).join(" ").trim();
    if (!text) {
      await message.channel.send("Write the message, ya lazy cunt.");
      return;
    }

    try {
      await member.send(
        `${message.member.user} says ${text} — delivered like a sneaky cunt.`
      );
      await message.delete();
    } catch (error) {
      await message.channel.send(
        "DM failed. Either they’re locked down or you’re a cursed cunt."
      );
      throw error;
    }
  },
};
