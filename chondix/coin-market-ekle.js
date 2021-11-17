const discord = require("discord.js");
const db = require("quick.db")
const reqconf = require("../ayarlar.json")


    exports.run = async(client,message,args) => {
        const eşya = args[0]
        const fiyat = args[1]
        const prize = args[2]
       if(message.author.id != reqconf.ownerID) {
           const sadeceowner = new discord.MessageEmbed()
           .setColor("RED")
           .setAuthor("❌ Yetersiz Yetki!")
           .setDescription("**Bu Komudu Sadece Bot Sahibi Kullanabilir**")
           return message.channel.send(sadeceowner)
       }
       if(!eşya) {
           const eksikesya = new discord.MessageEmbed()
           .setColor("RED")
           .setAuthor("❌ Eksik Argüman!")
           .setDescription("**Markete Koymak İçin Bir Eşya Belirtmelisiniz**")
           return message.channel.send(eksikesya)
       }
       if(!fiyat) {
        const eksikfiyat = new discord.MessageEmbed()
        .setColor("RED")
        .setAuthor("❌ Eksik Argüman!")
        .setDescription("**Markete Koyacağınız Eşya İçin Bir Fiyat Belirtmelisiniz**")
        return message.channel.send(eksikfiyat)
    }
    if(!prize) {
        const prizeyok = new discord.MessageEmbed()
        .setColor("RED")
        .setAuthor("❌ Eksik Argüman!")
        .setDescription("**Ödül Belirtilmemiş**")
        return message.channel.send(prizeyok)
    }
    const sendobj = {
        "esya": eşya,
        "fiyat": fiyat,
        "prize": prize
    }
    db.push("marketall", sendobj)
    const sucembed = new discord.MessageEmbed()
    .setAuthor("✅ Başarılı")
    .setDescription("**Başarıyla Eşya Markete Eklendi**")
    .setColor("GREEN")
    message.channel.send(sucembed)


    }
    exports.help = {
        name: "market-ekle",
        description: "Belirttiğiniz Kişinin Marketini Gösterir.",
        kullanim: "c?market <Etiket>",
        ornek: "c?market @✵ Emin.exe",
        baska: "c?market",
        kategori: "deneme",
    }