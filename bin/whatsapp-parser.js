#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { parseAndConvertChat } = require('../src/parser');

program
    .version('1.0.0')
    .description('Convert WhatsApp chat export to JSON array')
    .argument('<input>', 'input file path (exported WhatsApp chat)')
    .option('-o, --output <path>', 'output file path (default: chat-output.json)')
    .option('-f, --format', 'format JSON output (pretty print)')
    .action((input, options) => {
        try {
            // Read input file
            const chatContent = fs.readFileSync(input, 'utf-8');
            
            // Parse chat content
            const parsedData = parseAndConvertChat(chatContent);
            
            // Determine output path
            const outputPath = options.output || 'chat-output.json';
            
            // Write to file
            fs.writeFileSync(
                outputPath,
                options.format 
                    ? JSON.stringify(parsedData, null, 2)
                    : JSON.stringify(parsedData)
            );
            
            console.log(`✅ Successfully parsed chat to ${outputPath}`);
            console.log(`💬 Parsed ${parsedData.length} messages`);
            
        } catch (error) {
            console.error('❌ Error:', error.message);
            process.exit(1);
        }
    });

program.parse();