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
  //Skin
  if (command === 'skin') {
    const skin = await fetchCosmetic(args.join(' '), 'outfit');
    if (skin) {
      m.client.party.me.setOutfit(skin.id);
      m.reply(`Set the skin to ${skin.name}!`);
    } else m.reply(`The skin ${args.join(' ')} wasn't found!`);
  //Emote
  } else if (command === 'emote') {
    const emote = await fetchCosmetic(args.join(' '), 'emote');
    if (emote) {
      m.client.party.me.setEmote(emote.id);
      m.reply(`Set the emote to ${emote.name}!`);
    } else m.reply(`The emote ${args.join(' ')} wasn't found!`);
    //Backpack
    } else if (command === 'backpack') {
    const backpack = await fetchCosmetic(args.join(' '), 'backpack');
    if (backpack) {
        m.client.party.me.setBackpack(backpack.id);
        m.reply(`Set the backpack to ${backpack.name}!`);
        } else m.reply(`The backpack ${args.join(' ')} wasn't found!`);    
    //Emoji
    } else if (command === 'emoji') {
    const emoji = await fetchCosmetic(args.join(' '), 'emoji');
    if (emoji) {
        m.client.party.me.setEmoji(emoji.id);
        m.reply(`Set the emoji to ${emoji.name}!`);
        } else m.reply(`The emoji ${args.join(' ')} wasn't found!`);
    //Banner
    } else if (command === 'banner') {
    const banner = await fetchCosmetic(args.join(' '), 'banner');
    if (banner) {
            m.client.party.me.setBanner(banner.id);
            m.reply(`Set the emoji to ${banner.name}!`);
            } else m.reply(`The banner ${args.join(' ')} wasn't found!`);
    //Pickaxe
    } else if (command === 'pickaxe') {
    const pickaxe = await fetchCosmetic(args.join(' '), 'pickaxe');
    if (pickaxe) {
      m.client.party.me().setPickaxe(pickaxe.id);
      m.reply(`Set the pickaxe to ${pickaxe.name}!`);
    } else m.reply (`The pickaxe ${args.join(' ')} wasn't found!`);
    //Purpleskull
    } else if (command === 'purpleskull') {
            m.client.party.me.setOutfit('CID_030_Athena_Commando_M_Halloween', [{ channel: 'ClothingColor', variant: 'Mat1' }]);
            m.reply(`Set the skin to Purple Skull Trooper!`);
    //Pinkghoul
    } else if (command === 'pinkghoul') {
            m.client.party.me.setOutfit('CID_029_Athena_Commando_F_Halloween', [{ channel: 'Material', variant: 'Mat3' }]);
            m.reply(`Set the skin to Pink Ghoul Trooper!`);
    //Chun-Li Mode
    } else if (command === 'chunlimode') {
            m.client.party.hideMembers(true);
            m.client.party.me.setOutfit('CID_028_Athena_Commando_M_ChunLi', [{ channel: 'Material', variant: 'Mat1' }]);
            m.client.party.me.setEmote('EID_PartyHips');
            m.reply(`Have Fun (;!. If you want to stop then type the Command !default`);
    //Default
    } else if (command === 'default') {
            m.client.party.hideMembers(false);
            m.client.party.me.setReadiness(false);
            m.party.me.setOutfit(config.cid);
            m.party.me.setBackpack(config.bid);
            m.party.me.setPickaxe(config.pickaxeId);
            m.party.me.setLevel(config.level);
            m.party.me.setBanner(config.banner, config.bannerColor);
            m.reply(`Set the default settings!`);
    //Help
    } else if (command === 'help') {
        m.reply(`HELP COMMANDS Open the Chat to see all the commands!
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
        !discord - Shows the discord link`);
    //Fun & Util
    //Ready
    } else if (command === 'ready') {
        m.client.party.me.setReadiness(true);
        m.reply(`Ready!`);
    //Unready
    } else if (command === 'unready') {
        m.client.party.me.setReadiness(false);
        m.reply(`Unready!`);
    //Gift
    } else if (command === 'gift') {
        m.client.party.me.clearEmote();
        m.client.party.me.setEmote('EID_NeverGonna');
        m.reply(`Uhh, did you really think i was going to gift you?`);
    //Hide
    } else if (command === 'hide') {
      m.client.party.hideMembers(true);
      m.reply(`Hiding Members!`);
    //Unhide Members
    } else if (command === 'unhide') {
      m.client.party.hideMembers(false);
      m.reply(`Unhiding Members!`);
    //Level
    } else if (command === 'level') {
      m.client.party.me.setLevel(parseInt(content, 10));
      m.reply(`Set your level to ${content}!`);
    //Show Pickaxe
    } else if (command === 'showpickaxe') {
      m.party.me.setEmote('EID_IceKing');
      m.reply(`Showing Pickaxe!`);
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
    auth1 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth.json')) };
  } catch (e) {
    auth1 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 1: ') };
  }

    let auth2;
    try {
        auth2 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth2.json')) };
    } catch (e) {
        auth2 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 2: ') };
    }

    let auth3;
    try {
        auth3 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth3.json')) };
    } catch (e) {
        auth3 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 3: ') };
    }

    let auth4;
    try {
        auth4 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth4.json')) };
    } catch (e) {
        auth4 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 4: ') };
    }

    let auth5;
    try {
        auth5 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth5.json')) };
    } catch (e) {
        auth5 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 5: ') };
    }

    let auth6;
    try {
        auth6 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth6.json')) };
    } catch (e) {
        auth6 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 6: ') };
    }

    let auth7;
    try {
        auth7 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth7.json')) };
    } catch (e) {
        auth7 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 7: ') };
    }

    let auth8;
    try {
        auth8 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth8.json')) };
    } catch (e) {
        auth8 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 8: ') };
    }

    let auth9;
    try {
        auth9 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth9.json')) };
    } catch (e) {
        auth9 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 9: ') };
    }

    let auth10;
    try {
        auth10 = { deviceAuth: JSON.parse(await readFile('./auths/deviceAuth10.json')) };
    } catch (e) {
        auth10 = { authorizationCode: async () => Client.consoleQuestion('Please enter an Auth Code for Client 10: ') };
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
//3
const client3 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth3,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//4
const client4 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth4,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//5
const client5 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth5,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//6
const client6 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth6,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//7
const client7 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth7,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//8
const client8 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth8,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//9
const client9 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth9,
  "partyConfig": {
    "joinConfirmation": false,
    "joinability": "OPEN",
    "maxSize": 16,
    "chatEnabled": true,
},
  "debug": false
});
//10
const client10 = new Client({
  "defaultStatus": config.status,
  "platform": config.platform,
  "cachePresences": false,
  "auth": auth10,
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
  client1.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth.json', JSON.stringify(da, null, 2)));
  client1.on('party:member:message', handleCommand);
  client1.on('friend:message', handleCommand);
//2
  client2.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth2.json', JSON.stringify(da, null, 2)));
  client2.on('party:member:message', handleCommand);
  client2.on('friend:message', handleCommand);
//3
  client3.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth3.json', JSON.stringify(da, null, 2)));
  client3.on('party:member:message', handleCommand);
  client3.on('friend:message', handleCommand);
//4
  client4.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth4.json', JSON.stringify(da, null, 2)));
  client4.on('party:member:message', handleCommand);
  client4.on('friend:message', handleCommand);
//5
  client5.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth5.json', JSON.stringify(da, null, 2)));
  client5.on('party:member:message', handleCommand);
  client5.on('friend:message', handleCommand);
//6
  client6.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth6.json', JSON.stringify(da, null, 2)));
  client6.on('party:member:message', handleCommand);
  client6.on('friend:message', handleCommand);
//7
  client7.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth7.json', JSON.stringify(da, null, 2)));
  client7.on('party:member:message', handleCommand);
  client7.on('friend:message', handleCommand);
//8
  client8.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth8.json', JSON.stringify(da, null, 2)));
  client8.on('party:member:message', handleCommand);
  client8.on('friend:message', handleCommand);
//9
  client9.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth9.json', JSON.stringify(da, null, 2)));
  client9.on('party:member:message', handleCommand);
  client9.on('friend:message', handleCommand);
//10
  client10.on('deviceauth:created', (da) => writeFile('./auths/deviceAuth10.json', JSON.stringify(da, null, 2)));
  client10.on('party:member:message', handleCommand);
  client10.on('friend:message', handleCommand);


//Default Lodaut
//1
client1.setLoadout = () => {
  client1.party.hideMembers(false);
  client1.party.me.setReadiness(false);
  client1.party.me.setOutfit(config.cid);
  client1.party.me.setBackpack(config.bid);
  client1.party.me.setPickaxe(config.pickaxeId);
  client1.party.me.setLevel(config.level);
  client1.party.me.setBanner(config.banner, config.bannerColor);
  client1.party.me.clearEmote();
};
//2
client2.setLoadout = () => {
  client2.party.hideMembers(false);
  client2.party.me.setReadiness(false);
  client2.party.me.setOutfit(config.cid);
  client2.party.me.setBackpack(config.bid);
  client2.party.me.setPickaxe(config.pickaxeId);
  client2.party.me.setLevel(config.level);
  client2.party.me.setBanner(config.banner, config.bannerColor);
  client2.party.me.clearEmote();
};
//3
client3.setLoadout = () => {
  client3.party.hideMembers(false);
  client3.party.me.setReadiness(false);
  client3.party.me.setOutfit(config.cid);
  client3.party.me.setBackpack(config.bid);
  client3.party.me.setPickaxe(config.pickaxeId);
  client3.party.me.setLevel(config.level);
  client3.party.me.setBanner(config.banner, config.bannerColor);
  client3.party.me.clearEmote();
};
//4
client4.setLoadout = () => {
  client4.party.hideMembers(false);
  client4.party.me.setReadiness(false);
  client4.party.me.setOutfit(config.cid);
  client4.party.me.setBackpack(config.bid);
  client4.party.me.setPickaxe(config.pickaxeId);
  client4.party.me.setLevel(config.level);
  client4.party.me.setBanner(config.banner, config.bannerColor);
  client4.party.me.clearEmote();
};
//5
client5.setLoadout = () => {
  client5.party.hideMembers(false);
  client5.party.me.setReadiness(false);
  client5.party.me.setOutfit(config.cid);
  client5.party.me.setBackpack(config.bid);
  client5.party.me.setPickaxe(config.pickaxeId);
  client5.party.me.setLevel(config.level);
  client5.party.me.setBanner(config.banner, config.bannerColor);
  client5.party.me.clearEmote();
};
//6
client6.setLoadout = () => {
  client6.party.hideMembers(false);
  client6.party.me.setReadiness(false);
  client6.party.me.setOutfit(config.cid);
  client6.party.me.setBackpack(config.bid);
  client6.party.me.setPickaxe(config.pickaxeId);
  client6.party.me.setLevel(config.level);
  client6.party.me.setBanner(config.banner, config.bannerColor);
  client6.party.me.clearEmote();
};
//7
client7.setLoadout = () => {
  client7.party.hideMembers(false);
  client7.party.me.setReadiness(false);
  client7.party.me.setOutfit(config.cid);
  client7.party.me.setBackpack(config.bid);
  client7.party.me.setPickaxe(config.pickaxeId);
  client7.party.me.setLevel(config.level);
  client7.party.me.setBanner(config.banner, config.bannerColor);
  client7.party.me.clearEmote();
};
//8
client8.setLoadout = () => {
  client8.party.hideMembers(false);
  client8.party.me.setReadiness(false);
  client8.party.me.setOutfit(config.cid);
  client8.party.me.setBackpack(config.bid);
  client8.party.me.setPickaxe(config.pickaxeId);
  client8.party.me.setLevel(config.level);
  client8.party.me.setBanner(config.banner, config.bannerColor);
  client8.party.me.clearEmote();
};
//9
client9.setLoadout = () => {
  client9.party.hideMembers(false);
  client9.party.me.setReadiness(false);
  client9.party.me.setOutfit(config.cid);
  client9.party.me.setBackpack(config.bid);
  client9.party.me.setPickaxe(config.pickaxeId);
  client9.party.me.setLevel(config.level);
  client9.party.me.setBanner(config.banner, config.bannerColor);
  client9.party.me.clearEmote();
};
//10
client10.setLoadout = () => {
  client10.party.hideMembers(false);
  client10.party.me.setReadiness(false);
  client10.party.me.setOutfit(config.cid);
  client10.party.me.setBackpack(config.bid);
  client10.party.me.setPickaxe(config.pickaxeId);
  client10.party.me.setLevel(config.level);
  client10.party.me.setBanner(config.banner, config.bannerColor);
  client10.party.me.clearEmote();
};

//Friend and Party System
//1	
//Friend Request
client1.on("friend:request", (req) => {
  req.accept()
});
//Party System
client1.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client1.setLoadout();
  client1.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client1.on('party:member:left', () => {
  client1.party.setPrivacy(PrivacySetting.PUBLIC);
  client1.setLoadout();
});
//2
//Friend Request
client2.on("friend:request", (req) => {
  req.accept()
});
//Party System
client2.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client2.setLoadout();
  client2.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client2.on('party:member:left', () => {
  client2.party.setPrivacy(PrivacySetting.PUBLIC);
  client2.setLoadout();
});
//3
//Friend Request
client3.on("friend:request", (req) => {
  req.accept()
});
//Party System
client3.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client3.setLoadout();
  client3.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client3.on('party:member:left', () => {
  client3.party.setPrivacy(PrivacySetting.PUBLIC);
  client3.setLoadout();
});
//4
//Friend Request
client4.on("friend:request", (req) => {
  req.accept()
});
//Party System
client4.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client4.setLoadout();
  client4.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client4.on('party:member:left', () => {
  client4.party.setPrivacy(PrivacySetting.PUBLIC);
  client4.setLoadout();
});
//5
//Friend Request
client5.on("friend:request", (req) => {
  req.accept()
});
//Party System
client5.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client5.setLoadout();
  client5.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client5.on('party:member:left', () => {
  client5.party.setPrivacy(PrivacySetting.PUBLIC);
  client5.setLoadout();
});
//6
//Friend Request
client6.on("friend:request", (req) => {
  req.accept()
});
//Party System
client6.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client6.setLoadout();
  client6.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client6.on('party:member:left', () => {
  client6.party.setPrivacy(PrivacySetting.PUBLIC);
  client6.setLoadout();
});
//7
//Friend Request
client7.on("friend:request", (req) => {
  req.accept()
});
//Party System
client7.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client7.setLoadout();
  client7.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client7.on('party:member:left', () => {
  client7.party.setPrivacy(PrivacySetting.PUBLIC);
  client7.setLoadout();
});
//8
//Friend Request
client8.on("friend:request", (req) => {
  req.accept()
});
//Party System
client8.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client8.setLoadout();
  client8.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client8.on('party:member:left', () => {
  client8.party.setPrivacy(PrivacySetting.PUBLIC);
  client8.setLoadout();
});
//9
//Friend Request
client9.on("friend:request", (req) => {
  req.accept()
});
//Party System
client9.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client9.setLoadout();
  client9.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client9.on('party:member:left', () => {
  client9.party.setPrivacy(PrivacySetting.PUBLIC);
  client9.setLoadout();
});
//10
//Friend Request
client10.on("friend:request", (req) => {
  req.accept()
});
//Party System
client10.on('party:member:joined', () => {
  m.reply(`Hello, to see my Command use !help`);
  m.reply(`Also join my Discord for Updates and Status: https://discord.gg/DEDp2UQUx8`);
  client10.setLoadout();
  client10.party.setPrivacy(PrivacySetting.PRIVATE);
});
//Party Leave
client10.on('party:member:left', () => {
  client10.party.setPrivacy(PrivacySetting.PUBLIC);
  client10.setLoadout();
});


//Login
//1
  await client1.login();
  client1.setLoadout();
  console.log(`Logged in as ${client1.user.displayName}`);
//2
  await client2.login();
  client2.setLoadout();
  console.log(`Logged in as ${client2.user.displayName}`);
//3
  await client3.login();
  client3.setLoadout();
  console.log(`Logged in as ${client3.user.displayName}`);
//4
  await client4.login();
  client4.setLoadout();
  console.log(`Logged in as ${client4.user.displayName}`);
//5
  await client5.login();
  client5.setLoadout();
  console.log(`Logged in as ${client5.user.displayName}`);
//6
  await client6.login();
  client6.setLoadout();
  console.log(`Logged in as ${client6.user.displayName}`);
//7
  await client7.login();
  client7.setLoadout();
  console.log(`Logged in as ${client7.user.displayName}`);
//8
  await client8.login();
  client8.setLoadout();
  console.log(`Logged in as ${client8.user.displayName}`);
//9
  await client9.login();
  client9.setLoadout();
  console.log(`Logged in as ${client9.user.displayName}`);
//10
  await client10.login();
  client10.setLoadout();
  console.log(`Logged in as ${client10.user.displayName}`);

})();
