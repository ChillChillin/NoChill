"use strict";

module.exports = {
  name: "game",
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message }) {
    const member = message.mentions.members.first() || message.member;
    const activities = member.presence.activities;
    if (!activities || activities.length === 0) {
      await message.channel.send(
        `${member} isn’t playing anything, lazy cunt.`
      );
      return;
    }

    const games = activities.map((activity) => activity.name).join(", ");
    await message.channel.send(
      `${member} is playing ${games} — try not to suck, cunt.`
    );
  },
};
