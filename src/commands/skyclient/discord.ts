import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';
import fs from 'fs'
import skyclientutils from '../../functions/skyclientutils';

export default class discord extends BotCommand {
    constructor() {
        super('discord', {
            aliases: ['discord'],
            args: [{ id: "discord", type: "string" }],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions: [{ name: 'discord', description: 'The ID (neu, sba, things like that) of the discord server you want to get info on', type: 'STRING', required: true }],
            description: 'Shows info about a specific discord server in SkyClient',

        });
    }

    async exec(message, args) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            if (!args.discord) { return message.reply('lemme just telepathically get the discord you want from you... oh wait i can\'t') }

            let discords = await skyclientutils.getRepo('discords.json')

            let found = false

            for (const discord of discords) {
                if (discord.nicknames.includes(args.discord) && found == false || discord.id == args.discord && found == false) {
                    found = true

                    if (discord.partner == true) {
                        const partnerEmbed = new MessageEmbed()
                            .setTitle(discord.fancyname)
                            .setURL(`https://discord.gg/${discord.code}`)
                            .setColor(message.member.displayColor)
                            .setDescription(`${discord.description}\n\nDiscord Invite: \`https://discord.gg/${discord.code}\``)
                            .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${discord.icon}`)

                        if (message.type == 'REPLY') {
                            if (message.channel.type == 'GUILD_TEXT') {
                                const repliedMessage = await message.channel.messages.fetch(message.reference.messageId)
                                repliedMessage.reply({ content: `discord.gg/${discord.code}`, embeds: [partnerEmbed], allowedMentions: { repliedUser: true } })
                            }
                        }
                        else {
                            message.reply({ content: `discord.gg/${discord.code}`, embeds: [partnerEmbed] })
                        }
                    }
                    else {
                        if (message.type == 'REPLY') {
                            if (message.channel.type == 'GUILD_TEXT') {
                                const repliedMessage = await message.channel.messages.fetch(message.reference.messageId)
                                repliedMessage.reply({ content: `discord.gg/${discord.code}`, allowedMentions: { repliedUser: true } })
                            }
                        }
                        else {
                            message.reply({ content: `discord.gg/${discord.code}`, })
                        }
                    }
                }
            }
        }
    }
}