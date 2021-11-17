const Discord = require("discord.js");
const moment = require("moment")
const ayarlar = require("./ayarlar.json")
const db = require("quick.db")
const jimp = require("jimp")
const client = new Discord.Client();
const express = require("express");
const app = express();
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const disbut = require('discord-buttons')
disbut(client)
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("Bot Başarıyla Uptime Ediliyor . . .");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________

client.commands = new Discord.Collection();

fs.readdir("./chondix/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./chondix/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag}! Aktif!`);
});
//BOT ÇALIŞTIRICI______________________________________________________________
//coin
const quick = require('quick.db')
client.on("message", async(message) => {
  if (message.author.bot) return;
 if (!message.guild) return;
 const ayarfetch = quick.fetch(`coinsistem_${message.guild.id}`)
 if(ayarfetch == true) {
   if(message.content.length > 10) {
    quick.add(`coin_${message.author.id}_${message.guild.id}`, 2)
   }
   const fetch = quick.fetch(`coin_${message.author.id}_${message.guild.id}`)
   const objfetch = quick.fetch(`objcoin_${message.guild.id}`)
   if(objfetch !== null) {
    var res = objfetch.filter(obj => {
      return fetch >= obj.kacCoinLazim
     })
     if(res.length > 0) {
       try{
         for (let index = 0; index < res.length; index++) {
       await message.member.roles.add(res[index].rolID)            
         }
       } catch(e) {
         console.log(e)
       }
     }
   }
 }
})
client.login(ayarlar.token)
