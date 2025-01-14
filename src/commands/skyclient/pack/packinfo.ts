import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import commandManager from '../../../functions/commandManager';
import fs from 'fs'


import importUtils from '../../../functions/utils'
import msgutils from '../../../functions/msgutils';
import skyclientutils from '../../../functions/skyclientutils';
const utils = importUtils

export default class packName extends BotCommand {
    constructor() {
        super('packName', {
            aliases: ['pack', 'packinfo'],
            args: [{ id: "pack", type: "string" }],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                { name: 'pack', description: 'The ID of the pack you want to get info on', type: 'STRING' },
                { name: 'ephemeral', description: 'Whether or not you want the output to be ephemeral', type: 'BOOLEAN', required: false }
            ],
            description: 'Shows a list of all the packs in SkyClient'
        })
    }

    async exec(message, args) {
        let packJson
        packJson = await skyclientutils.getRepo('packs.json')

        let pack

        pack = packJson.find(pack => pack.id == args.pack && pack.display != 'no' || pack.nicknames && pack.nicknames.includes(args.pack) && pack.display != 'no')

        if (!pack) return msgutils.reply(message, {content:'I couldn\'t find a pack with that ID'})

        const packEmbed = new MessageEmbed()
            .setTitle(pack.display)
            .setDescription(pack.description)
        if (pack.command) packEmbed.addField('Command', pack.command)
        if (pack.url && pack.id != 'optifine') packEmbed.addField('Direct Download', `[${pack.file}](${pack.url})`)
        else if (!pack.url && pack.id != 'optifine') packEmbed.addField('Direct Download', `[${pack.file}](https://github.com/nacrt/SkyblockClient-REPO/blob/main/files/packs/${encodeURIComponent(pack.file)}?raw=true)`)

        if (message.member && message.member.displayColor) packEmbed.setColor(message.member.displayColor)
        else if (!message.member.displayColor && message.guild.me.displayColor) packEmbed.setColor(message.guild.me.displayColor)
        else if (!message.member) packEmbed.setColor('#fd87d2')

        if (pack.icon) packEmbed.setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/icons/${encodeURIComponent(pack.icon)}`)

        if (pack.creator) packEmbed.setFooter(`Created by ${pack.creator}`)

        msgutils.reply(message, { embeds: [packEmbed] })
    }
}