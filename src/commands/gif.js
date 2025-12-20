"use strict";

module.exports = {
  name: "gif",
  allowDirectMessage: true,
  requiredPermissions: ["SEND_MESSAGES"],
  async execute({ message, args, services }) {
    const query = args.join(" ").trim();
    if (!query) {
      await message.channel.send("Give me a search term, ya useless cunt.");
      return;
    }

    try {
      const gifUrl = await services.giphy.searchGif(query);
      if (!gifUrl) {
        await message.channel.send(
          "No gif for that, ya hopeless cunt. Try a real word."
        );
        return;
      }
      await message.channel.send({ files: [gifUrl] });
    } catch (error) {
      await message.channel.send(
        "No gif for that, ya hopeless cunt. Try a real word."
      );
      throw error;
    }
  },
};
