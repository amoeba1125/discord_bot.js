import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('回覆輸入的文字')
	.addStringOption(option =>
		option.setName('輸入')
			.setDescription('要回覆的文字')
			.setRequired(true))
	.addBooleanOption(option =>
		option.setName('隱藏')
			.setDescription('設定只有我能看見這則訊息'));

export const action = async(ctx)=>{
	const { commandName, options } = ctx;
	await ctx.deferReply({ ephemeral: options.getBoolean('隱藏') });
	await ctx.editReply({ content: options.getString('輸入')});
}
