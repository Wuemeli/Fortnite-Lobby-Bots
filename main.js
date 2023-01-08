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
    //help
    } else if (command === 'help') {
        m.reply(`HELP COMMANDS Open the Chat to see all the commands!
        !help - Shows this message
        !skin <skin> - Sets your skin
        !emote <emote> - Sets your emote
        !backpack <backpack> - Sets your backpack
        !emoji <emoji> - Sets your emoji
        !ready - Sets you to ready
        !unready - Sets you to unready
        !discord - Shows the discord link`);
    //Fun & Util
    } else if (command === 'ready') {
        m.client.party.me.setReadiness(true);
        m.reply(`Ready!`);
    } else if (command === 'unready') {
        m.client.party.me.setReadiness(false);
        m.reply(`Unready!`);
    } else if (command === 'discord') {
        m.reply(`Discord: https://discord.gg/https://discord.gg/DEDp2UQUx8`);
      }
};

//Login and Auth

//Client 1
(async () => {
  let auth;
  try {
    auth = { deviceAuth: JSON.parse(await readFile('./deviceAuth.json')) };
  } catch (e) {
    auth = { authorizationCode: async () => Client.consoleQuestion('Please enter an authorization code: ') };
  }

  const client = new Client({
        "defaultStatus": config.status,
        "platform": config.platform,
        "cachePresences": false,
        "auth": auth,
        "partyConfig": {
          "joinConfirmation": false,
          "joinability": "OPEN",
          "maxSize": 16,
          "chatEnabled": true,
      },
        "debug": false
    });

  client.setLoadout = () => {
      client.party.me.setReadiness(false);
      client.party.me.setOutfit(config.cid);
      client.party.me.setBackpack(config.bid);
      client.party.me.setPickaxe(config.pickaxeId);
      client.party.me.setLevel(config.level);
      client.party.me.setBanner(config.banner, config.bannerColor);
      client.party.me.clearEmote();
  };

  client.on('deviceauth:modfiy', (da) => writeFile('./deviceAuth.json', JSON.stringify(da, null, 2)));
  client.on('party:member:message', handleCommand);
  client.on('friend:message', handleCommand);


//Friend and Party Managing

client.on("friend:request", (req) => {
  req.accept()
});

//Client 2
(async () => {
  let auth2;
  try {
    auth2 = { deviceAuth2: JSON.parse(await readFile('./deviceAuth2.json')) };
  } catch (e) {
    auth2 = { authorizationCode: async () => Client.consoleQuestion('Please enter an authorization code for Client2: ') };
  };
  

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

  client2.setLoadout = () => {
      client2.party.me.setReadiness(false);
      client2.party.me.setOutfit(config.cid);
      client2.party.me.setBackpack(config.bid);
      client2.party.me.setPickaxe(config.pickaxeId);
      client2.party.me.setLevel(config.level);
      client2.party.me.setBanner(config.banner, config.bannerColor);
      client2.party.me.clearEmote();
  };

  client2.on('deviceauth2:create', (da) => writeFile('./deviceAuth2.json', JSON.stringify(da, null, 2)));
  client2.on('party:member:message', handleCommand);
  client2.on('friend:message', handleCommand);


//Friend and Party Managing

client2.on("friend:request", (req) => {
  req.accept()
});



//Login

  await client.login();
  console.log(`Logged in as ${client.user.displayName}`);
  client.setLoadout();
  await client2.login();
  console.log(`Logged in as ${client2.user.displayName}`);
  client2.setLoadout();

})();
})();