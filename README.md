# WhatsApp Chat Parser CLI

<p>A simple command-line tool to convert WhatsApp chat exports into clean JSON format.</p>

<h2>Features</h2>
<ul>
    <li>Convert WhatsApp chat export files to JSON</li>
    <li>Preserves message order and multi-line messages</li>
    <li>Handles media message indicators</li>
    <li>Simple command-line interface</li>
    <li>Optional pretty-printing of output</li>
    <li>Custom output file naming</li>
</ul>

<h2>Installation</h2>

<pre><code>npm install -g whatsapp-chat-parser-cli</code></pre>

<h2>Usage</h2>

<h3>Exporting WhatsApp Chat</h3>
<ol>
    <li>Open WhatsApp</li>
    <li>Open the chat you want to export</li>
    <li>Click the three dots menu (⋮)</li>
    <li>Select 'More' > 'Export chat'</li>
    <li>Choose 'Without media'</li>
    <li>Save the exported .txt file</li>
</ol>

<h3>Using the Parser</h3>

<p>Basic usage:</p>
<pre><code>whatsapp-parser chat.txt</code></pre>

<p>With options:</p>
<pre><code>whatsapp-parser chat.txt -o output.json -f</code></pre>

<h3>Command Line Options</h3>
<ul>
    <li><code>-o, --output &lt;path&gt;</code> - Specify output file path (default: chat-output.json)</li>
    <li><code>-f, --format</code> - Format JSON output (pretty print)</li>
    <li><code>-h, --help</code> - Display help information</li>
    <li><code>-V, --version</code> - Display version number</li>
</ul>

<h3>Output Format</h3>
<p>The parser generates a JSON array where each element represents a message:</p>

<pre><code>[
  {
    "sender": "John Doe",
    "message": "Hello world!"
  },
  {
    "sender": "Jane Smith",
    "message": "Hi there!"
  }
]</code></pre>

<h2>Examples</h2>
<ol>
    <li>Basic parsing:</li>
    <pre><code>whatsapp-parser WhatsApp.txt</code></pre>

    <li>Save to specific file with pretty printing:</li>
    <pre><code>whatsapp-parser WhatsApp.txt -o parsed-chat.json -f</code></pre>

    <li>Display help:</li>
    <pre><code>whatsapp-parser --help</code></pre>
</ol>

<h2>Contributing</h2>
<ol>
    <li>Fork the repository</li>
    <li>Create your feature branch (<code>git checkout -b feature/amazing-feature</code>)</li>
    <li>Commit your changes (<code>git commit -m 'Add some amazing feature'</code>)</li>
    <li>Push to the branch (<code>git push origin feature/amazing-feature</code>)</li>
    <li>Open a Pull Request</li>
</ol>

<h2>Known Limitations</h2>
<ul>
    <li>Currently only supports the default WhatsApp export format</li>
    <li>Media files are marked as <code>"Media omitted"</code> in the output</li>
    <li>System messages (like "Messages and calls are end-to-end encrypted") are ignored</li>
</ul>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the LICENSE file for details.</p>

<h2>Author</h2>
<p>Siddhesh Sonawane</p>

<h2>Acknowledgments</h2>
<ul>
    <li>Inspired by the need to analyze WhatsApp chat data</li>
    <li>Built with Node.js and Commander.js</li>
</ul>

<h2>Support</h2>
<p>For support, issues, or feature requests, please create an issue in the GitHub repository.</p>
