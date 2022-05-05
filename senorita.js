const Discord = require("discord.js");
const client = new Discord.Client();
const disbut = require("discord-buttons")(client)
const ayarlar = require("./ayarlar.js");
const fs = require("fs");
const db = require("orio.db");
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let cstoken;
if (ayarlar.TOKEN) {
  cstoken = ayarlar.TOKEN;
}

if (cstoken) {
  client.login(cstoken);
} else {
  console.log("Projeye Hiç Bir Bot Tokeni Yazılmamış!");
}

client.ayarlar = ayarlar


{
const cdb = require("orio.db")
client.on("clickButton", async button => {

let dataA = cdb.get(`button_${button.message.id}`)
if(!dataA) return;

let emote = {
başarılı: "✅"
}

let data = dataA.filter(cs => cs.id === `${button.id}`).map(veri => {

let member = button.guild.members.cache.get(button.clicker.user.id)

button.reply.think(true).then(async a => {

if(member.roles.cache.has(veri.rol)) {
 
a.edit(`> ${emote.başarılı} **Başarılı!** Butona tıkladığın için <@&${veri.rol}> Rolünü senden aldım.`)
member.roles.remove(veri.rol)

} else {

a.edit(`> ${emote.başarılı} **Başarılı!** Butona tıkladığın için <@&${veri.rol}> Rolünü sana verdim.`)
member.roles.add(veri.rol)

} 

        })
    })
})
}