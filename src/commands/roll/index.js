import {SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('roll')
	.setDescription('投擲一個骰子')
	.addStringOption(option =>
		option.setName('規則')
			.setDescription('定義投擲骰子的規則'))
	.addBooleanOption(option =>
		option.setName('隱藏')
			.setDescription('設定只有我能看見這則訊息'));

export const action = async(ctx)=>{
	const { commandName, options } = ctx;
	await ctx.deferReply({ ephemeral: options.getBoolean('隱藏') });
	let outputStr;
	
	if(options.getString('規則')){
		// 使用正則表達式從字串中提取投擲次數和骰子面數
		const regex = /(\d+)D(\d+)/;
		const match = options.getString('規則').match(regex);

		if (match) {
			const numThrows = parseInt(match[1]); // 投擲次數
			const numFaces = parseInt(match[2]); // 骰子面數
			let sum = 0;

			// 進行投擲並計算總和
			for (let i = 0; i < numThrows; i++) {
				const roll = Math.floor(Math.random() * numFaces) + 1; // 骰子點數介於 1 到 numFaces 之間
				sum += roll;
			}
			
			outputStr=sum.toString();
		}
		else{
			outputStr='輸入格式錯誤';
		}
	}
	else{
		outputStr=(Math.floor(Math.random()*6)+1).toString();
	}
	
	await ctx.editReply(':game_die: '+outputStr);
}