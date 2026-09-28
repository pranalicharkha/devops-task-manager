const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = req.url === '/'
        ? path.join(__dirname, 'index.html')
        : path.join(__dirname, req.url);

    const ext = path.extname(filePath);

    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        res.writeHead(200, {
            'Content-Type': contentTypes[ext] || 'text/plain'
        });

        res.end(content);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});