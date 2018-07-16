/*
* Commander Cody...
* The time has come...
*  ---- joke command ----
*/

exports.run = async (client, message, args, level) => {
    // sleep function
    function sleep(ms){
        return new Promise(resolve=>{
            setTimeout(resolve,ms)
        });
    }

    await message.channel.send(`Commander Cody... The time has come. Execute Order 66.`);
    
    var banningUserArray = ["Tsar Ruqimir Putin", "Kamm", "Mon Jihad"];
    for(var i=0; i < banningUserArray.length; i++) {
        const msg = await message.channel.send(`Banning ${banningUserArray[i]}`);
        await sleep(1000);
        msg.edit(`${msg}` + `.`);
        await sleep(1000);
        msg.edit(`${msg}` + `.`);
        await sleep(1000);
        msg.edit(`${msg}` + `.`);
        await sleep(1000);
        msg.edit(`Banning ${banningUserArray[i]} - Complete.`);
        await(2000);
    }
    await message.channel.send(`Really? Did you think it would be that easy?`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "thetimehascome",
    category: "Miscellaneous",
    description: "Commander Cody... The time has come. Execute Order 66.",
    usage: "thetimehascome"
};
