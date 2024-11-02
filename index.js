// index.js

const fs = require('fs');
const path = require('path');
const { parseAndConvertChat } = require('./src/parser');

/**
 * Reads a WhatsApp chat file and converts it to JSON format.
 * Outputs individual JSON files for each sender and a complete chat JSON file.
 * @param {string} filePath - Path to the WhatsApp chat export (.txt file).
 * @param {string} outputDir - Directory to save the output JSON files.
 */
function convertWhatsAppChatToJson(filePath, outputDir = './output') {
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return;
    }

    const chatContent = fs.readFileSync(filePath, 'utf-8');
    const { messagesBySender, completeChat } = parseAndConvertChat(chatContent);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Save individual JSON files for each sender
    Object.keys(messagesBySender).forEach(sender => {
        const jsonData = JSON.stringify(messagesBySender[sender], null, 2);
        const safeSenderName = sender.replace(/\s+/g, '_');
        const fileName = `${safeSenderName}_chat.json`;

        fs.writeFileSync(path.join(outputDir, fileName), jsonData);
        console.log(`Saved JSON for ${sender}: ${fileName}`);
    });

    // Save the complete chat JSON
    const completeChatJson = JSON.stringify(completeChat, null, 2);
    fs.writeFileSync(path.join(outputDir, 'complete_chat.json'), completeChatJson);
    console.log('Saved complete chat JSON: complete_chat.json');
}

module.exports = { convertWhatsAppChatToJson };
