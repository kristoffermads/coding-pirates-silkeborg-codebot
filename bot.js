import { CacheType, ChatInputCommandInteraction } from "discord.js";
const dotenv = require('dotenv');
dotenv.config();
const { Client, GatewayIntentBits } = require('discord.js');


/**
 * Code library
 */
class Coder {
	private offset = 0;
	private alphabet = "abcdefghijklmnopqrtsuvwxyzæøå";

	constructor(offset:any) {
			this.offset = offset;
	}
	encrypt(input:any) {    
			var encodedString = "";
			for (var i:any=0; i < input.length; i++) {
					var char = input[i];
					var isUpper = char === char.toUpperCase() ? true : false;
	
					char = char.toLowerCase();
	
					if (this.alphabet.indexOf(char) > -1) {
							var newIndex = this.alphabet.indexOf(char) + this.offset;
							if (newIndex < this.alphabet.length) {
									isUpper ? encodedString += this.alphabet[newIndex].toUpperCase() : encodedString += this.alphabet[newIndex];
							} else {
									var shiftedIndex = -(this.alphabet.length - newIndex);
									isUpper ? encodedString += this.alphabet[shiftedIndex].toUpperCase() : encodedString += this.alphabet[shiftedIndex];
							}
					} else {
							encodedString += char;
					}
			}
			return encodedString
	}
	decrypt(input:any) {
			var decodedString = "";
			var offset = 4;
			for (var i:any=0; i < input.length; i++) {
					var char = input[i];
					var isUpper = char === char.toUpperCase() ? true : false;
	
					char = char.toLowerCase();
	
					if (this.alphabet.indexOf(char) > -1) {
							var newIndex = this.alphabet.indexOf(char) - this.offset;
							if (newIndex >= 0) {
									isUpper ? decodedString += this.alphabet[newIndex].toUpperCase() : decodedString += this.alphabet[newIndex];
							} else {
									var shiftedIndex = ((this.alphabet.length) + newIndex);
									isUpper ? decodedString += this.alphabet[shiftedIndex].toUpperCase() : decodedString += this.alphabet[shiftedIndex];
							}
					} else {
							decodedString += char;
					}
			}
			return decodedString
	}
}



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('CodingPirates Code-Bot is ready! Raarrwww!');
});

client.on('interactionCreate', async (interaction) => 
{
	if (!interaction.isChatInputCommand()) return;
	if (!interaction.guild)return;
	const { commandName } = interaction;

	if (commandName === 'encode') 
	{
		let text = interaction.options.getString("input");
		let ciffer = interaction.options.getInteger("ciffer") ?? 5;

		let coder = new Coder(ciffer);
		let encode = coder.encrypt(text);
		
		await interaction.reply({ content: encode, ephemeral: true });
	} 
	else if (commandName === 'decode') 
	{
		let text = interaction.options.getString("input");
		let ciffer = interaction.options.getInteger("ciffer") ?? 5;

		let coder = new Coder(ciffer);
		let decode = coder.decrypt(text);
		await interaction.reply({ content: decode, ephemeral: true });
	}
});

client.login(process.env.token);