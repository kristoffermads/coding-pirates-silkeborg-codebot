const { SlashCommandBuilder, Routes, ApplicationCommandOptionType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');
const { options } = require('nodemon/lib/config');
dotenv.config();

const token = process.env.token;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

const commands = 
	[
		
		new SlashCommandBuilder()
					.setName('decode')
					.setDescription('Decode a message')
					.addStringOption(option => option
																			.setName('input')
																			.setDescription("The input to be decoded")
																			.setRequired(true)
					).addIntegerOption(option => option.setName('ciffer').setDescription('The ciffer to decode')),

		new SlashCommandBuilder()
					.setName('encode')
						.setDescription('Encode a message')
						.addStringOption(option => option
																			.setName('input')
																			.setDescription("The input to be encoded")
						).addIntegerOption(option => option.setName('ciffer').setDescription('The ciffer to decode')),

		new SlashCommandBuilder()
						.setName('test')
						.setDescription('Test en besked'),
	]
	.map(command => command.toJSON());

	
const rest = new REST({ version: '10' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);