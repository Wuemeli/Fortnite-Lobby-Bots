Skip to content
Search or jump to…
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@Wuemeli 
gamingblueshell-dev
/
fnbrjs-bot
Public
Code
Pull requests
Actions
Projects
Security
Insights
fnbrjs-bot/server.js /

Glitch (fnbrjs-bot) Initial Commit
Latest commit 85f60da on May 22, 2021
 History
 0 contributors
91 lines (76 sloc)  3.14 KB

const { Client } = require("fnbr");
const { auth, logger } = require("./utils");
const fs = require("fs");
const path = require("path");
const config = require("./config.js");
const FortniteAPI = require("fortnite-api-com");
const Fortnite = new FortniteAPI({
    apikey: "no longer required",
    language: "en",
    debug: true
});

(async() => {
    let deviceAuth;
    try {
        deviceAuth = await auth.checkDeviceAuth(JSON.parse(await fs.readFileSync("./deviceAuth.json", "utf8")));
    } catch(e) {
        deviceAuth = await auth.createDeviceAuth(path.join(__dirname, "deviceAuth.json"));
    };

    const client = new Client({
        status: config.status,
        platform: config.platform,
        cachePresences: false,
        auth: {
            deviceAuth: deviceAuth
        },
        debug: false
    });

    client.commands = new Map();
    client.aliases = new Map();
  
    const files = fs.readdirSync(`${__dirname}/commands`).filter(f => f.endsWith(".js"));
    for (const f of files) {
        const props = require(`${__dirname}/commands/${f}`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    };
    logger.info("All commands loaded!");
  
    client.on("friend:request", (req) => {
        config.friendAccept ? req.accept() : req.decline();
        
        logger.info(`${config.inviteAccept ? "Accepted" : "Declined"} friend request from ${req.sender.displayName}`);
    });
  
    client.on("party:invite", (inv) => {
        config.inviteAccept ? inv.accept() : inv.decline();
        
        logger.info(`${config.inviteAccept ? "Accepted" : "Declined"} party invite from ${inv.sender.displayName}`);
    });
  
    client.on("friend:message", (message) => {
        logger.info(`Message from ${message.author.displayName}: ${message.content}`);
      
        const prefix = config.prefix;
        const args = message.content.slice(prefix.length).trim().split(" ");
        const cmd = args.shift().toLowerCase();
        const command = client.commands.has(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd));
      
        if(!message.content.startsWith(prefix)) return;
      
        try {
            command.run(client, message, args, logger, Fortnite);
        } catch(e) {
            return;
        };
    });
  
    client.on("party:member:joined", () => {
        client.setLoadout();
        client.party.sendMessage(`Hi I'm ${client.user.displayName}, an open source lobby bot made by Distrust. To obtain a copy visit: https://github.com/distrust1/fnbrjs-bot.`);
    });
  
    client.setLoadout = () => {
        client.party.me.setReadiness(false);
        client.party.me.setOutfit(config.cid);
        client.party.me.setBackpack(config.bid);
        client.party.me.setPickaxe(config.pickaxeId);
        client.party.me.setLevel(config.level);
        client.party.me.setBanner(config.banner, config.bannerColor);
        client.party.me.clearEmote();
        client.party.me.setEmote(config.eid);
    };
  
    await client.login();
    logger.info(`Logged in as ${client.user.displayName}`);
})();