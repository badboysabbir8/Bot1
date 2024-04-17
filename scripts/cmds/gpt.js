const axios = require('axios');
 
module.exports = {
  config: {
    name: 'gpt',
    version: '1.0',
    author: 'Arfan',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: { en: `gpt ai` },
    longDescription: { en: `Generative Pre-trained Transformer ai` },
    guide: { en: '{pn} [query]' },
  },
 
  onStart: async function ({ api, event, args }) {
    try {
      const prompt = `assume you are sakura bot made by arfan mahim. you are a multipurpose AI bot that ease the daily works in messenger through automation. Now reply the following message:

      `+args.join(" ");
 
      if (prompt) {
        const processingMessage = await api.sendMessage(`Asking Sakura AI (GPT). Please wait a moment...`, event.threadID);
        const response = await axios.get(`https://ts-ai-api-shuddho.onrender.com/api/chatgpt4?prompt=${encodeURIComponent(prompt)}`);
 
        if (response.data && response.data.responseData.reply) {
          await api.sendMessage({ body: response.data.responseData.reply }, event.threadID, event.messageID);
          console.log(`Sent GPT's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from Gemini API`);
        }
 
        await api.unsendMessage(processingMessage.messageID);
      }
 
    } catch (error) {
      console.error(`❌ | Failed to get GPT's response: ${error.message}`);
      api.sendMessage(`❌ | An error occured. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);
    }
  },
};
