# Fortnite Lobby Bot
The Fortnite Lobby Bot is a bot designed for use with the Fortnite game on PC or console. It allows players to set various cosmetic options for their character within the game, such as their skin, emote, backpack, pickaxe, banner, and emoji.

The bot uses the fnbr package, which provides a convenient way to interact with the Fortnite API.

## Commands
The bot responds to the following commands:

``!skin <skin>`` - sets the player's skin to the specified skin
``!emote <emote>`` - sets the player's emote to the specified emote
!backpack <backpack>`` - sets the player's backpack to the specified backpack
!emoji <emoji>`` - sets the player's emoji to the specified emoji
!banner <banner> - sets the player's banner to the specified banner
!pickaxe <pickaxe> - sets the player's pickaxe to the specified pickaxe
!purpleskull - sets the player's skin to the Purple Skull Trooper
!pinkghoul - sets the player's skin to the Pink Ghoul Trooper
!chunlimode - enables the Chun-Li mode (sets the player's outfit to Chun-Li, hides other players, and sets an emote)
!default - sets the player's settings back to the default configuration
!help - displays the list of available commands
Note that for the !skin, !emote, !backpack, !emoji, and !banner commands, the argument should be the name of the cosmetic item that you want to set (e.g., !skin Dark Voyager).

## Usage
To use the Fortnite Lobby Bot, follow these steps:

Download the bot's code from the repository.
Install the dependencies by running ``npm install`` in the bot's directory.
Start the bot by running ``npm start``.
Follow the bot's prompts to set up each instance.
After setting up the bot, you can copy the files to a server and run ``docker build -t fortnite-bot .`` to build a Docker image. Then, start the bot with ``docker run -d --name my-fortnite-bot fortnite-bot.``

For more information on using Docker, please refer to the Docker documentation.
