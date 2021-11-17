const discord = require("discord.js");
const db = require("quick.db")
const reqconf = require("../ayarlar.json")


exports.run = async(client, message, args) => {
    var sucstring = "4"
        const dbfetch = db.fetch("marketall")
       if(dbfetch == null) {
           const marketyok = new discord.MessageEmbed()
           .setColor("GREEN")
           .setAuthor("Market")
           .setDescription("**Markette Herhangi Bir Eşya Bulunmamakta**")
           return message.channel.send(marketyok)
       }
       dbfetch.forEach(element => {
           sucstring += "**" + element.esya + " | " + element.fiyat + "**" + "\n"
       });
      const res = new discord.MessageEmbed()
      .setAuthor("Market")
      .setColor("GREEN")
      .setDescription(sucstring)
      message.channel.send(res)
    }
    exports.help = {
        name: "market",
        description: "Belirttiğiniz Kişinin Marketini Gösterir.",
        kullanim: "c?market <Etiket>",
        ornek: "c?market @✵ Emin.exe",
        baska: "c?market",
        kategori: "deneme",
    }