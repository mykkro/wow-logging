var connect = require('connect'),
    http = require('http'),
    path = require("path"),
    directory = path.join(__dirname, 'public');

connect()
    .use(connect.static(directory))
    .listen(9990);

console.log('Listening on port 9990.');
