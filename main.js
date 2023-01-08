/* eslint-disable */
const { readFile, writeFile } = require('fs').promises;
const axios = require('axios').default;
const { Client } = require('fnbr');
const config = require("./config.json");

//API
const fetchCosmetic = async (name, type) => {
  try {
    const { data: cosmetic } = (await axios(`https://fortnite-api.com/v2/cosmetics/br/search?name=${encodeURI(name)}&type=${type}`)).data;
    return cosmetic;
  } catch (err) {
    return undefined;
  }
};



//Commands
const handleCommand = async (m) => {
  if (!m.content.startsWith('!')) return;
  const args = m.content.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  //Cosmetics
  if (command === 'outfit' || command === 'skin') {
    const skin = await fetchCosmetic(args.join(' '), 'outfit');
    if (skin) {
      m.client.party.me.setOutfit(skin.id);
      m.reply(`Set the skin to ${skin.name}!`);
    } else m.reply(`The skin ${args.join(' ')} wasn't found!`);
  } else if (command === 'emote' || command === 'dance') {
    const emote = await fetchCosmetic(args.join(' '), 'emote');
    if (emote) {
      m.client.party.me.setEmote(emote.id);
      m.reply(`Set the emote to ${emote.name}!`);
    } else m.reply(`The emote ${args.join(' ')} wasn't found!`);
    } else if (command === 'backpack' || command === 'backbling' || command === 'backpack') {
    const backpack = await fetchCosmetic(args.join(' '), 'backpack');
    if (backpack) {
        m.client.party.me.setBackpack(backpack.id);
        m.reply(`Set the backpack to ${backpack.name}!`);
        } else m.reply(`The backpack ${args.join(' ')} wasn't found!`);    
    } else if (command === 'emoji') {
    const emoji = await fetchCosmetic(args.join(' '), 'emoji');
    if (emoji) {
        m.client.party.me.setEmoji(emoji.id);
        m.reply(`Set the emoji to ${emoji.name}!`);
        }
    } else if (command === 'banner') {
    const banner = await fetchCosmetic(args.join(' '), 'banner');
    if (banner) {
            m.client.party.me.setBanner(banner.id);
            m.reply(`Set the emoji to ${banner.name}!`);
            }
    //help
    } else if (command === 'help') {
        m.reply(`HELP COMMANDS Open the Chat to see all the commands!
        !help - Shows this message
        Cosemtics:
        !skin <skin> - Sets your skin
        !emote <emote> - Sets your emote
        !backpack <backpack> - Sets your backpack
        !emoji <emoji> - Sets your emoji
        Fun & Util:
        !ready - Sets you to ready
        !unready - Sets you to unready
        !gift - Gifts the whole Lobby the Item Shop
        !hide - Hides Members
        !unhide - Unhides Members
        Info:
        !discord - Shows the discord link`);
    //Fun & Util
    } else if (command === 'ready') {
        m.client.party.me.setReadiness(true);
        m.reply(`Ready!`);
    } else if (command === 'unready') {
        m.client.party.me.setReadiness(false);
        m.reply(`Unready!`);
    } else if (command === 'gift') {
        m.client.party.me.clearEmote();
        m.client.party.me.setEmote('EID_NeverGonna');
        m.reply(`Uhh, did you really think i was going to gift you?`);
    } else if (command === 'hide') {
      m.client.party.hideMembers(true);
      m.reply(`Hiding Members!`);
    } else if (command === 'unhide') {
      m.client.party.hideMembers(false);
      m.reply(`Unhiding Members!`);
    //Info
    } else if (command === 'discord') {
        m.reply(`Discord: https://discord.gg/https://discord.gg/DEDp2UQUx8`);
      }
};

//Login and Auth

//Clients
(async () => {
  let auth1;
  try {
    auth1 = { deviceAuth: JSON.parse(await readFile('./deviceAuth.json')) };
  } catch (e) {
    auth1 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 1: ') };
  }

    let auth2;
    try {
        auth2 = { deviceAuth: JSON.parse(await readFile('./deviceAuth2.json')) };
    } catch (e) {
        auth2 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 2: ') };
    }

//Bot

//1
const client1 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth1,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});

//2
//1
const client2 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth2,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});

//Events
//1
  client1.on('deviceauth:created', (da) => writeFile('./deviceAuth.json', JSON.stringify(da, null, 2)));
  client1.on('party:member:message', handleCommand);
  client1.on('friend:message', handleCommand);

//2

  client2.on('deviceauth:created', (da) => writeFile('./deviceAuth2.json', JSON.stringify(da, null, 2)));
  client2.on('party:member:message', handleCommand);
  client2.on('friend:message', handleCommand);

//Default Lodaut

//1
client1.setLoadout = () => {
  client.party.me.setReadiness(false);
  client.party.me.setOutfit(config.cid);
  client.party.me.setBackpack(config.bid);
  client.party.me.setPickaxe(config.pickaxeId);
  client.party.me.setLevel(config.level);
  client.party.me.setBanner(config.banner, config.bannerColor);
  client.party.me.clearEmote();
};

//2
client2.setLoadout = () => {
  client.party.me.setReadiness(false);
  client.party.me.setOutfit(config.cid);
  client.party.me.setBackpack(config.bid);
  client.party.me.setPickaxe(config.pickaxeId);
  client.party.me.setLevel(config.level);
  client.party.me.setBanner(config.banner, config.bannerColor);
  client.party.me.clearEmote();
};

//Login
//1
  await client1.login();
  client1.setLoadout
  console.log(`Logged in as ${client1.user.displayName}`);
//2
  await client2.login();
  client2.setLoadout
  console.log(`Logged in as ${client2.user.displayName}`);

})();
