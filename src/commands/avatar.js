"use strict";

module.exports = {
  name: "avatar",
  allowDirectMessage: true,
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message }) {
    const user = message.mentions.users.first() || message.author;
    await message.channel.send(
      `Here’s the mug, ya nosy cunt: https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
    );
  },
};
