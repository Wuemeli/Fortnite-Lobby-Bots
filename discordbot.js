const { Client, Intents } = require("discord.js");
const Axios = require('axios');
const config = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

//Ready

client.on("ready", () => {
  client.user.setActivity("Type {help");
  console.log("I am ready!");
});

//Command Handling

client.on("messageCreate", (message) => {
//Help
  if (message.content.startsWith("{help")) {
    message.channel.send("commands:\n{featured\n{daily\n{specialFeatured\n{status\n{list");
//Item Shop
  } if (message.content.startsWith("{daily")) {
    fortniteStuff("daily", message);
  } if (message.content.startsWith("{featured")) {
    fortniteStuff("featured", message);
  } if (message.content.startsWith("{specialFeatured")) {
    fortniteStuff("specialFeatured", message);
//Fortnite Bot Status and List
//Status
  } if (message.content.startsWith("{status")) {
    message.channel.send("All Fortnite Bots Are Online.");
//List
  } if (message.content.startsWith("{list")) {
    message.channel.send("Fortnite Bots:\nFNKarmaBot1\nFNKarmaBot2\nFNKarmaBot3\nFNKarmaBot4\nFNKarmaBot5\nFNKarmaBot6\nFNKarmaBot7\nFNKarmaBot8\nFNKarmaBot9\nFNKarmaBot10");
//Invalid Command
  } if (message.content.startsWith("{")) {
    message.channel.send("Invalid Command");
  }
});

//Login

client.login(config.dcbottoken);

//API

const fortniteStuff = (shop, message) => {
    const response = Axios.get("https://fortnite-api.com/v2/shop/br").then(
    response => {
        const data = response["data"]["data"];
        const featured = data["featured"];
        const daily = data["daily"];
        const specialFeatured = data["specialFeatured"];
        
        if (shop === "daily") {
            parseFortniteShop(daily, message);
        } else if (shop === "featured") {
            parseFortniteShop(featured, message);
        } else if (shop === 'specialFeatured') {
            parseFortniteShop(specialFeatured, message);
        }
    });
}

//Parsing

const parseFortniteShop = (object, message) => {

    let items = {};
    const entries = object["entries"];
    for (let key in entries) {
        for (let i in entries[key]["items"]) { 
            if (entries[key]["bundle"] == null) {
                let section = entries[key]["section"]["name"];
                if (items[section] === undefined) {
                    items[section] = [];
                } else {
                    items[section].push([entries[key]["items"][i]["name"], entries[key]["finalPrice"], entries[key]["items"][i]["images"]["smallIcon"]]);
                }
            }
        }
    }
    printItems(items, message);
}

//Printing

const printItems = (items, message) => {
    for (let key in items) {
        message.channel.send("\n**"+key+"** " + "Collection");
        items[key].forEach(element => {
            message.channel.send(element[2] +"\nItem Name: " + element[0] + "\nPrice: " + element[1]);
        })
        
    }
}