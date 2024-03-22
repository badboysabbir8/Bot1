const axios = require('axios');

module.exports = {
	config: {
		name: "manga",
		aliases: ["manga"],
		version: "1.0",
		author: "Tashfif",
		countDown: 5,
		role: 0,
		shortDescription: "get manga data",
		longDescription: "search and get manga infos",
		category: "anime",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`⚠️ | Please enter character name!`);
		else {
			const BASE_URL = `https://api.safone.me/anime/manga/search?query=${name}`;
			try {
				let res = await axios.get(BASE_URL)


				let res2 = res.data

				let titl = res2.title.english + " " + res2.title.native
				let statu = res2.status
				let dura = res2.duration
				let episode = res2.episodes
				let startDat = res2.startDate.day + "/" + res2.startDate.month + "/" + res2.startDate.year
				let endDat = res2.endDate.day + "/" + res2.endDate.month + "/" + res2.endDate.year
				let genre = res2.genres
				let studio = res2.studios
				let score = res2.averageScore
				let desc = res2.description
				let typ = res2.type
				let img = res2.imageUrl

				const form = {
					body: `===「 Manga Info 」===`
						+ `\\🔰 Name: ${titl}`
						+ `\\♻️ Status: ${statu}`
						+ `\📕 Types: ${typ}`
						+ `\✅ Episode: ${episode}`
						+ `\🕙 Duration: ${dura}`
						+ `\⭐ Score: ${score}`
						+ `\📅 Started: ${startDat}`
						+ `\📅 Ended: ${endDat}`
						+ `\\💾 Genres: ${genre}`
						+ `\\📺 Studios: ${studio}`
						+ `\\🔉 Description: ${desc}`

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) { message.reply(`🥺 Not Found`) }

		}
	}
};