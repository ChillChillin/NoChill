# NoChill Discord Bot

⚠️ **Explicit Content / Strong Language**  
This bot is intentionally abrasive. It uses profanity in responses. Make sure your
server rules allow that style before deploying.

## Overview

NoChill is a Discord bot with a small command set focused on moderation utilities,
gif search, and playful (read: rude) responses. It uses:

- **Discord.js v12**
- **Giphy API** for GIF search
- **Urban Dictionary API** for definitions

## Requirements

- Node.js 14+ (Node.js 16+ recommended)
- A Discord bot token
- A Giphy API key

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a `.env` file**
   ```dotenv
   token=YOUR_DISCORD_BOT_TOKEN
   giphyToken=YOUR_GIPHY_API_KEY
   prefix=!
   cooldownMs=3000
   maxMessageLength=2000
   ```

3. **Run the bot**
   ```bash
   npm start
   ```

## Commands

All commands are prefixed (default `!`). You can change the prefix with `prefix` in
your `.env` file.

| Command | Description |
| --- | --- |
| `!kick @user` | Kicks the mentioned user (requires Kick + Ban permissions). |
| `!gif <query>` | Searches Giphy and posts a GIF. |
| `!dm @user <message>` | Sends a DM to the mentioned user. |
| `!game [@user]` | Shows what game a user is playing. |
| `!re-education` | Posts the “re-education” link. |
| `!avatar [@user]` | Posts a user’s avatar. |
| `!finger` | Posts the rude image. |
| `!urban <term>` | Looks up a term on Urban Dictionary. |

### Examples

```text
!kick @username
!gif dog
!urban cope
```

## Production notes

- **Permissions**: Make sure the bot role has the permissions required for each
  command (Kick Members, Ban Members, Send Messages, etc.).
- **Rate limiting**: The bot enforces a per-command cooldown (`cooldownMs`).
- **Channel safety**: The `member-log` channel is used for join greetings, if it
  exists.
- **Environment hygiene**: Keep `.env` out of source control.

## Troubleshooting

- **Bot doesn’t respond**: Confirm your prefix, token, and that the bot is
  online in the server.
- **GIF search fails**: Verify your Giphy API key is valid.
- **Urban Dictionary errors**: The API is rate limited and can be flaky.

## License

ISC
