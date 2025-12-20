"use strict";

module.exports = {
  name: "kick",
  requiredPermissions: ["KICK_MEMBERS", "BAN_MEMBERS"],
  async execute({ message, services }) {
    const member = message.mentions.members.first();
    if (!member) {
      await message.channel.send("Tag someone to kick, ya chaotic cunt.");
      return;
    }

    try {
      await member.kick();
      const gifUrl = await services.giphy.searchGif("fail");
      if (gifUrl) {
        await message.channel.send(
          `:middle_finger: ${member.displayName} just got the boot, ya filthy cunt. :middle_finger:`,
          { files: [gifUrl] }
        );
        return;
      }
      await message.channel.send(
        `:middle_finger: ${member.displayName} just got the boot, ya filthy cunt. :middle_finger:`
      );
    } catch (error) {
      await message.channel.send(
        "Couldn’t kick that bastard. Discord’s being a useless cunt."
      );
      throw error;
    }
  },
};
