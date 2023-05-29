import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('echo input')
	.addStringOption(option =>								//
		option.setName('input')								//	要加上這個部分才能輸入參數
			.setDescription('The input to echo back'));		//

export const action = async(ctx)=>{
	await ctx.deferReply();
	const { commandName, options } = ctx;

	const input = options.getString('input');
    await ctx.editReply(input);
}
