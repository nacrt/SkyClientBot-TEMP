import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';

import importUtils from '../../functions/utils'
const utils = importUtils

export default class say extends BotCommand {
    constructor() {
        super('say', {
            aliases: ['say'],
            args: [{ id: 'thingtosay', type: 'string', match: 'restContent' }],
            slash: true,
            description: 'Sends a message of your choice!',
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                { name: 'thingtosay', description: 'What you want the bot to say!', type: 'STRING' }
            ],
            ownerOnly: true
        })
    }
    async exec(message, slashOptions) {
        message.channel.send(slashOptions.thingtosay).then(msg => {
            const sentEmbed = new MessageEmbed()
                .setTitle('Message sent!')
                .addField('Content', msg.content)
                .setColor(message.member.displayColor)
            if (message.interaction) { message.interaction.reply({ embeds: [sentEmbed], ephemeral: true }) }
            else { message.delete() }
        })
    }
}