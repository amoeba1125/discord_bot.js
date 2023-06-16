import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('choose')
	.setDescription('從多個選項中回覆其中一個')
	.addStringOption(option =>
		option.setName('選項')
			.setDescription('不同選項之間以空白區分')
			.setRequired(true))
	.addBooleanOption(option =>
		option.setName('隱藏')
			.setDescription('設定只有我能看見這則訊息'));

export const action = async(ctx)=>{
	const { commandName, options } = ctx;
	await ctx.deferReply({ ephemeral: options.getBoolean('隱藏') });
	const inputList = options.get('選項').value.split(/\s+/);
	let outputStr = '選項：';
	for(var i=0;i<inputList.length;i++){
		if(i != 0)
			outputStr += ' ';
		outputStr = outputStr + '`' + inputList[i] + '`';
	}
	outputStr = outputStr+'\n結果：`' + inputList[Math.floor(Math.random() * inputList.length)] + '`';
	await ctx.editReply(outputStr);
}
