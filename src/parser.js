// parser.js

const fs = require('fs');
const readline = require('readline');

/**
 * Parses WhatsApp chat content into a JSON structure grouped by sender.
 * @param {string} chatContent - The raw chat content from WhatsApp export.
 * @returns {Object} Parsed chat data with messages organized by sender and a complete chat array.
 */
function parseAndConvertChat(chatContent) {
    const dateRegex = /[\d]{1,2}\/[\d]{1,2}\/[\d]{2}/;
    const timeRegex = /[\d]{1,2}:\d{2}\s*(?:[aApP][mM])/;
    const messageRegex = new RegExp(dateRegex.source + ', ' + timeRegex.source + ' - (.*?): (.*)');

    const messagesBySender = {};
    const completeChat = [];

    chatContent.split(/\r?\n/).forEach(line => {
        line = line.trim();
        const messageMatch = line.match(messageRegex);

        if (messageMatch) {
            const sender = messageMatch[1];
            const text = messageMatch[2];

            // Append to individual sender's list
            if (!messagesBySender[sender]) {
                messagesBySender[sender] = [];
            }
            messagesBySender[sender].push({ message: text });

            // Append to complete chat
            completeChat.push({ sender, message: text });
        } else if (completeChat.length > 0) {
            // Handle multi-line messages
            const lastMessage = completeChat[completeChat.length - 1];
            lastMessage.message += '\n' + line;

            const lastSender = lastMessage.sender;
            messagesBySender[lastSender][messagesBySender[lastSender].length - 1].message += '\n' + line;
        }
    });

    return { messagesBySender, completeChat };
}

module.exports = { parseAndConvertChat };
