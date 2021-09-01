import { BotCommand } from "../../../extensions/BotCommand"
import utils from '../../../functions/utils'
import { exec } from 'child_process';
import { promisify } from 'util';

const sh = promisify(exec)

export default class pullAutoresponse extends BotCommand {
    constructor() {
        super("pullAutoresponse", {
            aliases: ["pullAutoresponse", 'pullRepo'],

        });
    }
    async exec(message) {
        const coolPeople = [
            '881310086411190293', //Lisena
            '435443705055543306', //nacrt
            '464851580370419733', //micro
            '378587857796726785', //koxx12
        ]
        if (coolPeople.includes(message.author.id)) {
            sh('cd SkyblockClient-REPO && git reset --hard && git pull')
            .then(() => {
                message.channel.send('pulled (probably)')
            })
        }
        else {
            message.channel.send('hey so you dont have the perms to run this command, if you think you deserve them ping lis or make a pr')
        }
    }
}