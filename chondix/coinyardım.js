const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Coin yardım menüsü`)
.addFields(
    {name:`> .coin`,value: `Coin ini görürsün`},
    {name:`> .coin-ekle`,value:`Coin Eklersiniz`},
    {name:`> .coin-rol`,value:`Coin İle attlanacak Rol Ayarlarsınız`},
    {name:`> .coin-sil`,value:`Coin Siler`},
    {name:`> .coin-set`,value:`Coin Sistemini Açıp Kapatılır`},
    {name:`> .market`,value:`Marketi Görürsünüz`},
    {name:`> .market-ekle`,value:`Markete Eşya Eklersiniz`},
    {name:`> .satın-al`,value:`Marketten Eşya Satın Alırsınız`}
)
.setFooter(`Chondix`,client.user.avatarURL({dynamic:true}))
.setTimestamp()

return message.channel.send(embed)
}
exports.conf = {
    aliases:[]
}
exports.help = {
    name: "coin-yardım"
}