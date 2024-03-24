const axios = require('axios');

module.exports = {
  config: {
    name: "dl",
    version: "1.6",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "download content by link",
    longDescription: "download content",
    category: "download",
    guide: "{pn} link"
  },

  onStart: async function ({ message, args }) {
    const link = args.join(" ");
    if (!link)
      return message.reply(`Please provide the link.`);
    else {
      let BASE_URL;

      if (link.includes("facebook.com")) {
        BASE_URL = `https://apis-samir.onrender.com/fbdl?vid_url=${encodeURIComponent(link)}`;
      } else if (link.includes("twitter.com")) {
        BASE_URL = `https://apis-samir.onrender.com/twitter?url=${encodeURIComponent(link)}`;
      } else if (link.includes("tiktok.com")) {
        BASE_URL = `https://apis-samir.onrender.com/tiktok?url=${encodeURIComponent(link)}`;
      } else if (link.includes("open.spotify.com")) {
        BASE_URL = `https://apis-samir.onrender.com/spotifydl?url=${encodeURIComponent(link)}`;
      } else if (link.includes("youtu.be") || link.includes("youtube.com")) {
        const providedURL = `https://api-samir.onrender.com/ytdl?url=${link}`;
        message.reply({
          attachment: await global.utils.getStreamFromURL(providedURL),
        });
        return;
      } else if (link.includes("instagram.com")) {
        BASE_URL = `https://apis-samir.onrender.com/igdl?url=${encodeURIComponent(link)}`;
      } else {
        return message.reply(`Unsupported source.`);
      }

      message.reply("Processing your request... Please wait.");

      try {
        let res = await axios.get(BASE_URL);

        let contentUrl;

        if (link.includes("facebook.com")) {
          contentUrl = res.data.links["Download High Quality"];
        } else if (link.includes("twitter.com")) {
          contentUrl = res.data.HD;
        } else if (link.includes("tiktok.com")) {
          contentUrl = res.data.hdplay;
        } else if (link.includes("open.spotify.com")) {
          contentUrl = res.data.link;
        } else if (link.includes("instagram.com")) {
          const instagramResponse = res.data;
          if (Array.isArray(instagramResponse.url) && instagramResponse.url.length > 0) {
            const mp4UrlObject = instagramResponse.url.find(obj => obj.type === 'mp4');
            if (mp4UrlObject) {
              contentUrl = mp4UrlObject.url;
            }
          }
        }

        const response = {
          attachment: await global.utils.getStreamFromURL(contentUrl)
        };

        await message.reply(response);
      } catch (e) {
        message.reply(`Sorry, the content could not be downloaded.`);
      }
    }
  }
};
