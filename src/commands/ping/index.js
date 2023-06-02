import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('回覆\'pong!\'')
	.addBooleanOption(option =>
		option.setName('隱藏')
			.setDescription('設定只有我能看見這則訊息'));

export const action = async(ctx)=>{
	const { commandName, options } = ctx;
	await ctx.deferReply({ ephemeral: options.getBoolean('隱藏') });
	await ctx.editReply( 'pong!' );
}
