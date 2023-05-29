import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('echo input')

export const action = async(ctx)=>{
	const { commandName, options } = ctx;

	const text = options.getString('text');
    ctx.reply(text);
}
