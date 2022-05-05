const Discord = require("discord.js");
const db = require("orio.db")
const disbut = require("discord-buttons");

exports.run = async(client, message, args) => {

const prefix = require("../ayarlar.js").prefix

// Emojiler - Başlangıç \\ 

let emote = {
başarılı: "✅",
başarısız: "❌"
}

// Emojiler - Bitiş \\ 

// Tanımlar - Başlangıç \\ 

let olştur     = args.slice(1).join(" ")
let değştr     = args.slice(3).join(" ")
let buttonmsj  = args.slice(4).join(" ")
let komut      = args[0]
let komut1     = args[1]
let komut2     = args[2]
let komut3     = args[3]
let rol        = message.mentions.roles.first()
let sayıX      = db.get(`buttonrol_${message.guild.id}`) || "0"
let data       = db.get(`buttonmesajsayı_${komut2}_${message.guild.id}`)
let data2      = db.get(`buttonmesajsayı_${komut1}_${message.guild.id}`)
let mesaj      = db.get(`buttonmesaj_${message.guild.id}`)

// Tanımlar - Bitiş \\ 

// Buton Mesaj Oluştur - Başlangıç \\ 

if(komut === "oluştur") {

//------------\\

if(!olştur) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen butonun üzerinde yazıcak yazıyı belirtin! **Örnek:** `"+ prefix +"buttonrol oluştur Kayıt Olmak İçin Tıkla`")

if(olştur.length >= 2000) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Butonun üzerinde yazıcak mesaj en fazla 2000 karakter olmadılır!")

if(mesaj) {
if(mesaj.length >= 100) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** MAX 10 tane button rol mesajı oluşturabilirsiniz.")
}

//------------\\

db.add(`buttonmesajID_${message.guild.id}`, 1)

let sayı = db.get(`buttonmesajID_${message.guild.id}`)

message.channel.send(olştur).then(msj => {

db.push(`buttonmesaj_${message.guild.id}`, {
id: `${sayı}`,
mesaj: msj.id,
kanal: msj.channel.id
})

db.set(`buttonmesajsayı_${sayı}_${message.guild.id}`, {
id: `${sayı}`,
mesaj: msj.id,
kanal: msj.channel.id
})

})

//------------\\

let embed = new Discord.MessageEmbed()
.setTitle(emote.başarılı + " Başarılı!")
.setDescription(`Button mesaj oluşturuldu!`)
.addField("Mesaj ID", `\`\`\`${sayı}\`\`\``)
.addField("Mesaj", `\`\`\`${komut1}\`\`\``)
.setColor("AQUA")

message.channel.send(embed)

//------------\\

return;
}

// Buton Mesaj Oluştur - Bitiş \\ 

// Buton Mesaj Sıfırla  - Başlangıç \\ 

if(komut == "sıfırla" || komut == "kaldır") {

//------------\\

if(isNaN(komut1)) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Silmek istediğiniz seçeneğin ID'sini belirtin!`)

if(!data2) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Sistemde bu ID'ye sahip buton mesajı yok! **Seçenek Listesi** \`${prefix}buttonrol liste\``)

//------------\\

client.channels.cache.get(data2.kanal).messages.fetch(data2.mesaj).then(a => a.delete())

db.delete(`buttonSAYI_${data2.mesaj}`)
db.delete(`button_${data2.mesaj}`)
db.delete(`buttonmesajsayı_${komut1}_${message.guild.id}`)
db.unpush(`buttonmesaj_${message.guild.id}`, {id: `${komut1}`})

//------------\\

message.channel.send(`> ${emote.başarılı} **Başarılı!** **${komut1}** ID'li button rol mesajı ve butonları silindi!`)

//------------\\

return;
}

// Buton Mesaj Sıfırla - Bitiş \\ 

// Buton Mesaj Değiştir - Başlangıç \\ 

if(komut == "mesaj") {
if(komut1 == "değiştir") {

//------------\\

if(!komut2) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen buton mesaj ID'sini belirtin! **Örnek:** `"+ prefix +"buttonrol mesaj değiştir 1 @Rol'ünü almak için butona Tıkla!`")

if(!data) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Belirtiğiniz ID bir mesaja ait değil! **Oluşturmak İçin:** `"+ prefix +"buttonrol oluştur Kayıt Olmak için Tıkla!`")

if(!değştr) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen button gönderme mesajı belirtin! **Örnek:** `"+ prefix +"buttonrol mesaj değiştir Kayıt Olmak için Tıkla!`")

if(değştr.length >= 2000) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Button gönderme mesajı MAX 2000 harf olmalıdır! **Örnek:** `"+ prefix +"buttonrol mesaj değiştir Kayıt Olmak için Tıkla!`")

//------------\\

client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit(değştr))

let sexpert = new Discord.MessageEmbed()
.setTitle(`${emote.başarılı} Başarılı!`)
.setDescription(`Buttonları gönderirken üstünde yazıcak mesaj ayarlandı.`)
.addField("Yeni Mesaj ↷", "```" + değştr + "```")
.setColor("RANDOM")

message.channel.send(sexpert)

//------------\\

return;
}
}

// Buton Mesaj Değiştir - Bitiş \\ 

// Buton Ekle/Kaldır - Başlangıç \\ 

if(komut == "button" || komut == "buton") {
if(komut1 == "ekle") {

//------------\\

if(!komut2) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen buton mesaj ID'sini belirtin! **Örnek:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündeki Yazı!`")

if(!data) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Belirtiğiniz ID bir mesaja ait değil! **Oluşturmak İçin:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündeki Yazı!`")

let maxbutton = db.get(`button_${data.mesaj}`) || "0"

if(maxbutton.length >= 24) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Bir mesaja MAX 25 tane button eklenebilir!")

if(!rol) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen eklemek istedğiniz rol belirtin! **Örnek:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündeki Yazı!`")

if(!buttonmsj) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen buttonun yazısını belirtin! **Örnek:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündeki Yazı!`")

if(buttonmsj.length >= 99) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Button yazısı MAX 100 karakter olmalıdır! **Örnek:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündeki Yazı!`")

//------------\\

db.add(`buttonSAYI_${data.mesaj}`, 1)

let sayı = db.get(`buttonSAYI_${data.mesaj}`)

db.push(`button_${data.mesaj}`, {
id: `${sayı}`,
rol: rol.id,
yazı: buttonmsj
})

//------------\\

let sexpert = new Discord.MessageEmbed()
.setTitle(`${emote.başarılı} Başarılı!`)
.setDescription(`Başarılı **${komut2}** IDye sahip mesaja ${sayı} IDli button eklendi.`)
.addField("Button ID ↷", "```" + sayı + "```")
.addField("Button ROL ↷", "```" + rol.name + " | " + rol.id + "```")
.addField("Button Yazısı ↷", "```" + buttonmsj + "```")
.setColor("RANDOM")

message.channel.send(sexpert)

//------------\\

let buttondata = db.get(`button_${data.mesaj}`)

if(buttondata.length <= 5) {

//------------\\

let ls = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group]}))

//------------\\
}

//------------\\

if(buttondata.length >= 5 && buttondata.length <= 10) {

//------------\\

let ls = []
let ls1 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1]}))

//------------\\
}

//------------\\

if(buttondata.length >= 10 && buttondata.length <= 15) {

//------------\\

let ls = []
let ls1 = []
let ls2 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1, group2]}))

//------------\\
}

//------------\\

if(buttondata.length >= 15 && buttondata.length <= 20) {

//------------\\

let ls = []
let ls1 = []
let ls2 = []
let ls3 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(15, 20)
.map(veri => ls3.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setEmoji("903256265067741195")
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);
        let group3 = new disbut.MessageActionRow().addComponents(ls3);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1, group2, group3]}))

//------------\\
}

//------------\\

if(buttondata.length >= 20 && buttondata.length <= 25) {

//------------\\

let ls = []
let ls1 = []
let ls2 = []
let ls3 = []
let ls4 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(15, 20)
.map(veri => ls3.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(20, 25)
.map(veri => ls4.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);
        let group3 = new disbut.MessageActionRow().addComponents(ls3);
        let group4 = new disbut.MessageActionRow().addComponents(ls4);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1, group2, group3, group4]}))

//------------\\
}

//------------\\

return;
}

//------------\\

if(komut1 == "kaldır") {

//------------\\

if(!komut2) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen buton mesaj ID'sini belirtin! **Örnek:** `"+ prefix +"buttonrol button kaldır <Mesaj ID> <Button ID>`")

if(!data) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Belirtiğiniz ID bir mesaja ait değil! **Eklemek İçin:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündekı Yazı!`")

if(!komut3) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Lütfen kaldırmak istedğiniz butonun ID belirtin! **Örnek:** `"+ prefix +"buttonrol button kaldır <Mesaj ID> <Button ID>`")

let buttonDATA = db.get(`button_${data.mesaj}`)

if(!buttonDATA) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Belirtiğiniz Mesaj IDsinde button yok! **Eklemek İçin:** `"+ prefix +"buttonrol button ekle 1 @rol Buton Üstündekı Yazı!`")

if(!buttonDATA.map(cs => cs.id).includes(komut3)) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Belirtiğiniz ID bir butona ait değil! **Örnek:** `"+ prefix +"buttonrol button kaldır <Mesaj ID> <Button ID>`")

//------------\\

buttonDATA.filter(cs => cs.id === `${komut3}`).map(veri => {

let sexpert = new Discord.MessageEmbed()
.setTitle(`${emote.başarılı} Başarılı!`)
.setDescription(`Başarılı **${data.id}** IDye sahip mesajdan ${veri.id} IDli button silindi.`)
.addField("Button ID ↷", "```" + veri.id + "```")
.addField("Button Rol ↷", "```" + veri.rol + "```")
.addField("Button Yazısı ↷", "```" + veri.yazı + "```")
.setColor("RANDOM")

message.channel.send(sexpert)

//------------\\

db.unpush(`button_${data.mesaj}`, { id: `${komut3}`})

//------------\\

let buttondata = db.get(`button_${data.mesaj}`)

if(buttondata.length <= 5) {

//------------\\

let ls = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group]}))

//------------\\
}

//------------\\

if(buttondata.length >= 5 && buttondata.length <= 10) {

//------------\\

let ls = []
let ls1 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1]}))

//------------\\
}

//------------\\

if(buttondata.length >= 10 && buttondata.length <= 15) {

//------------\\

let ls = []
let ls1 = []
let ls2 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1, group2]}))

//------------\\
}

//------------\\

if(buttondata.length >= 15 && buttondata.length <= 20) {

//------------\\

let ls = []
let ls1 = []
let ls2 = []
let ls3 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(15, 20)
.map(veri => ls3.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setEmoji("903256265067741195")
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);
        let group3 = new disbut.MessageActionRow().addComponents(ls3);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1, group2, group3]}))

//------------\\
}

//------------\\

if(buttondata.length >= 20 && buttondata.length <= 25) {

//------------\\

let ls = []
let ls1 = []
let ls2 = []
let ls3 = []
let ls4 = []

buttondata
.sort((a, b) => a.id - b.id)
.slice(0, 5)
.map(veri => ls.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(5, 10)
.map(veri => ls1.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(10, 15)
.map(veri => ls2.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(15, 20)
.map(veri => ls3.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

buttondata
.sort((a, b) => a.id - b.id)
.slice(20, 25)
.map(veri => ls4.push(
new disbut.MessageButton()
.setStyle("grey")
.setLabel(veri.yazı)
.setID(veri.id)))

//------------\\

        let group = new disbut.MessageActionRow().addComponents(ls);
        let group1 = new disbut.MessageActionRow().addComponents(ls1);
        let group2 = new disbut.MessageActionRow().addComponents(ls2);
        let group3 = new disbut.MessageActionRow().addComponents(ls3);
        let group4 = new disbut.MessageActionRow().addComponents(ls4);

  client.channels.cache.get(data.kanal).messages.fetch(data.mesaj).then(a => a.edit({components: [group, group1, group2, group3, group4]}))

//------------\\
}

})

//------------\\

return;
}
}

// Buton Ekle/Kaldır - Bitiş \\ 

// Butonları Listele - Başlangıç \\ 

if(komut == "liste") {
if(komut1) {
if(!data2) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Belirtiğiniz ID bir mesaja ait değil! **Oluşturmak İçin:** `"+ prefix +"emojirol oluştur Kayıt Olmak için Tıkla!`")

let buttonDATA = db.get(`button_${data2.mesaj}`)

let DCS = []
let expert = 1
 
if(buttonDATA) {

buttonDATA
.sort((a, b) => a.id - b.id)
.map(veri => DCS.push(`\`${expert++}.\` ID: **${veri.id}** Rol: <@&${veri.rol}> 
Button Yazısı: \`${veri.yazı}\``))

let embed = new Discord.MessageEmbed()
.setTitle("Button Rol Seçenekleri")
.setDescription(`
> Mesaj ID: **${data2.id}** Mesaj Kanal: <#${data2.kanal}> Mesaj: [Tıkla!](https://discord.com/channels/${message.guild.id}/${data2.kanal}/${data2.mesaj})
`)
.addField("Button(s)", DCS.join("\n"))
.setColor("RANDOM")

message.channel.send(embed)
}

if(!buttonDATA) {

let embed = new Discord.MessageEmbed()
.setTitle("Button Rol Seçenekleri")
.setDescription(`
ID: **${data2.id}** Kanal: <#${data2.kanal}> Mesaj: [Tıkla!](https://discord.com/channels/${message.guild.id}/${data2.kanal}/${data2.mesaj})
`)
.addField("Button(s)", "> Bulunmuyor :)")
.setColor("RANDOM")

message.channel.send(embed)

}

return;
}

//------------\\

if(!mesaj) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Sistemde gösterilcek button rol mesajı yok! **Eklemek İçin:** \`${prefix}buttonrol oluştur <Mesaj Yazısı>\``)

//------------\\

let expert = 1
let DCS = []

mesaj
.sort((a, b) => a.id - b.id)
.map(veri => {
let exx = db.get(`button_${veri.mesaj}`)

if(!exx) exx = "0"
else exx = exx.length

//------------\\

DCS.push(`\`${expert++}.\` ID: **${veri.id}** Kanal: <#${veri.kanal}> Mesaj: [Tıkla!](https://discord.com/channels/${message.guild.id}/${veri.kanal}/${veri.mesaj})
Button(s): **${exx}** tane buttonu bulunuyor.`)
}).join("\n")

//------------\\

let embed = new Discord.MessageEmbed()
.setTitle("Button Rol Seçenekleri")
.setDescription(DCS)
.setColor("RANDOM")
.setFooter(`${prefix}buttonrol liste <Mesaj ID> | Mesajdaki butonlar hakkında bilgi alırsınız!`)


message.channel.send(embed)

//------------\\

return;
}

// Butonları Listele  - Bitiş \\ 

// Uyarı - Başlangıç \\ 

if(komut !== "oluştur" && komut !== "buton"  && komut !== "button" && komut !== "kaldır" && komut !== "liste" && komut !== "mesaj" && komut !== "sıfırla") {

let uyarı = new Discord.MessageEmbed()
.setTitle(emote.başarısız + " Başarısız!")
.setDescription("> Komutu kullanmak için argüman belirtin!")
.addField("Buton Oluşturmak;", "```" + 
`
${prefix}buton oluştur <Buton Üstünde Yazıcak Mesaj>
${prefix}buton mesaj değiştir <Button Mesaj ID> <Yeni Mesaj> 
${prefix}buton sıfırla <Button Mesaj ID> 
${prefix}buton liste

`

+ "```")
.addField("Buton Rol Eklemek/Kaldırmak", "```" + 
`
${prefix}rol button ekle <Button Mesaj ID> @rol Button Yazısı
${prefix}rol button kaldır <Button Mesaj ID> <Button ID>
${prefix}rol <Button Mesaj ID> 
`
 
+ "```")
.setColor("AQUA")


message.channel.send(uyarı)
}

// Uyarı - Bitiş \\ 

};

exports.conf = {
 aliases: ["button-rol","buton","rol"],
};

exports.help = {
  name: "buttonrol",
};  