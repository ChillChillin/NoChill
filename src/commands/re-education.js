"use strict";

module.exports = {
  name: "re-education",
  allowDirectMessage: true,
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message }) {
    await message.channel.send(
      "Off to re-education, ya cooked cunt: https://www.youtube.com/watch?v=U06jlgpMtQs"
    );
  },
};
