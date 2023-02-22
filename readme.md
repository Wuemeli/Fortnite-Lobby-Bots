# Fortnite Lobby Bot
The Fortnite Lobby Bot is a bot designed for use with the Fortnite game on PC or console. It allows players to set various cosmetic options for their character within the game, such as their skin, emote, backpack, pickaxe, banner, and emoji.

The bot uses the fnbr package, which provides a convenient way to interact with the Fortnite API.

## Commands
The bot responds to the following commands:

!help - Shows this message

Cosemtics:
!skin <skin> - Sets your skin

!emote <emote> - Sets your emote

!backpack <backpack> - Sets your backpack

!emoji <emoji> - Sets your emoji

!banner <banner> - Sets your banner

!pickaxe <pickaxe> - Sets your pickaxe

!purpleskull - Sets your skin to Purple Skull Trooper

!pinkghoul - Sets your skin to Pink Ghoul Trooper

!chunlimode - Activates the SUS Mode

!default - Sets the default settings

Fun & Util:

!ready - Sets you to ready

!unready - Sets you to unready

!gift - Gifts the whole Lobby the Item Shop

!hide - Hides Members

!unhide - Unhides Members

!level <level> - Sets your level

!showpickaxe - Shows your pickaxe

Info:

!discord - Shows the discord link

## Usage
To use the Fortnite Lobby Bot, follow these steps:

Download the bot's code from the repository.

Install the dependencies by running ``npm install`` in the bot's directory.

Start the bot by running ``npm start``.

Follow the bot's prompts to set up each instance.

After setting up the bot, you can copy the files to a server and run ``docker build -t fortnite-bot .`` to build a Docker image. Then, start the bot with ``docker run -d --name my-fortnite-bot fortnite-bot.``

For more information on using Docker, please refer to the Docker documentation.
