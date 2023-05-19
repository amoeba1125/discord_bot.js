import {REST, Routes} from 'discord.js'	//discord.js中包裝HTTP request的方法
import fg from 'fast-glob'	//用來遍歷資料夾內的檔案

const updateSlashCommands = async (commands) => {
	const rest = new REST({version: 10}).setToken(process.env.TOKEN)
	const result = await rest.put(
		Routes.applicationGuildCommands(
			process.env.APPLICATION_ID,
			process.env.GUILD_ID,
		),
		{
			body:commands,
		},
	)
	
	console.log(result)
}

export const loadCommands = async() => {
	const commands = []
	const files = await fg('./src/commands/**/index.js')
	
	for(const file of files){
		const cmd = await import(file)
		commands.push(cmd.command)
	}
	
	await updateSlashCommands(commands)
}