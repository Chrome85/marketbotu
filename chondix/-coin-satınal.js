const discord = require("discord.js");
const db = require("quick.db")
const reqconf = require("../ayarlar.json")


exports.run = async(client,message,args) => {
    console.log(reqconf.ownerID)
        console.log(message.author.id)
        if(!message.guild) return
        var fetchdata = db.fetch(`coin_${message.author.id}_${message.guild.id}`)
        if(fetchdata == null) fetchdata = 0
        const esya = args[0]
        if(!esya) {
            const esyayok = new discord.MessageEmbed()
            .setAuthor("❌ Eksik Argüman!")
            .setColor("RED")
            .setDescription("**Satın Almak İçin Bir Eşya Belirtmelisiniz**")
            return message.channel.send(esyayok)
        }
        const dbfetch = db.fetch("marketall")
        if(dbfetch == null) {
            const marketbos = new discord.MessageEmbed()
            .setAuthor("❌ Market Boş")
            .setDescription("**Markette Hiçbir Eşya Yok Bu Yüzden Birşey Alamazsın!**")
            .setColor("RED")
            return message.channel.send(marketbos)
        }
        const findinarr = dbfetch.find(elem => elem.esya.toLowerCase() == esya.toLowerCase())
        if(findinarr == undefined) {
            const marketteyok = new discord.MessageEmbed()
            .setAuthor("❌ Yanlış Argüman!")
            .setColor("RED")
            .setDescription("**Markette Bu Ada Sahip Bir Eşya Yok**")
            return message.channel.send(marketteyok)
        }
        const fiyat = findinarr.fiyat
        if(fetchdata < fiyat) {
            const yetersizpara = new discord.MessageEmbed()
            .setAuthor("❌ Yetersiz Para")
            .setDescription(`**Bu Eşyayı Satın Alabilmek İçin ${fiyat} Coine İhtiyacın Var**`)
            .setColor("RED")
            return message.channel.send(yetersizpara)
        }
        try{
            const send1 = new discord.MessageEmbed()
            .setAuthor("Ödülünüz")
            .setDescription(findinarr.prize)
            .setColor("GREEN")
            message.author.send(send1)
            const send = new discord.MessageEmbed()
            .setAuthor("✅ Başarılı")
            .setDescription("**Eşya Başarıyla Satın Alındı**")
            .setColor("GREEN")
            message.channel.send(send)           
             console.log(`${message.author.id} ${findinarr.prize} Ödülünü Satın Aldı!`);
            db.subtract(`coin_${message.author.id}_${message.guild.id}`, fiyat)
            setTimeout(() => {
                db.add(`coin_${reqconf.ownerID}_${message.guild.id}`, fiyat)                
            }, 1000);
        }catch(e) {
            if(e.message == "Cannot send messages to this user") {
                message.channel.send("***Ödülünü Sana Gönderebilmem İçin DM Kutunu Açmalısın**")
            }
        }

    }
    exports.help = {
        name: "satınal",
        description: "Belirttiğiniz Kişinin Marketini Gösterir.",
        kullanim: "c?market <Etiket>"
    }