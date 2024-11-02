// src/parser.js
const fs = require('fs');
const readline = require('readline');

/**
 * Parses WhatsApp chat content into a JSON array of messages.
 * @param {string} chatContent - The raw chat content from WhatsApp export.
 * @returns {Array} Array of parsed chat messages with sender and message content.
 */
function parseAndConvertChat(chatContent) {
    const dateRegex = /[\d]{1,2}\/[\d]{1,2}\/[\d]{2}/;
    const timeRegex = /[\d]{1,2}:\d{2}\s*(?:[aApP][mM])/;
    const messageRegex = new RegExp(dateRegex.source + ', ' + timeRegex.source + ' - (.*?): (.*)');
    const completeChat = [];
    
    chatContent.split(/\r?\n/).forEach(line => {
        line = line.trim();
        const messageMatch = line.match(messageRegex);
        
        if (messageMatch) {
            const sender = messageMatch[1];
            const text = messageMatch[2];
            completeChat.push({ sender, message: text });
        } else if (completeChat.length > 0) {
            // Handle multi-line messages
            const lastMessage = completeChat[completeChat.length - 1];
            lastMessage.message += '\n' + line;
        }
    });
    
    return completeChat;
}

module.exports = { parseAndConvertChat };