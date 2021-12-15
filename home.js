var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb+srv://hali03:hali03@cluster0.finwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const server = http.createServer((req, res) => {
    var filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'homePage.html' : req.url
    );
    // Ensure correct content type is picked
    var contentType = getContType(filePath);


    if (req.url == '/result') {
        res.writeHead(200, {'Content-Type': 'text/html'}); 
        pdata = ""; 
        req.on('data', data => {
            pdata += data.toString();
        })
        .on('end', () => {
            pdata = qs.parse(pdata);

            var age = pdata['option-1'];
            var gender = pdata['input_gender'];
            var workout_type = pdata['input_workout_type'];
            console.log(`Hamza put in ${age} ${gender} ${workout_type}`);

            connectAndDisplay(age, gender, workout_type, res);
        });
    }
    else { 
        fs.readFile(filePath, function(err, content) {
            if (err) { 
                display404Page(err, res);
            }
            else { displayCurrentContent(content, contentType, res); }
        });
    }
});

// the port in a variable using environment variable;
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));

function getContType(filePath) {
    var ext = path.extname(filePath);
    switch(ext) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        default:
            return 'text/html';
    }
}


function display404Page(err, res) {
    if (err.code == 'ENOENT') { 
        // Display 404 page
        fs.readFile(path.join(__dirname, 'public', '404.html'), 
                (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
    }
}


function displayCurrentContent(content, contentType, res) {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf8');
}

async function connectAndDisplay(age, gender, workout_type, res) {
    var t = `<body style = "background: linear-gradient(#002240, white); color: #fff; font-family: 'Verdana', sans-serif; text-align: center">`;

    MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, async (err, database) => {
        if (err) {
            console.log("Connection to Mongo err: " + err);
            return;
        }

        // get database and collection object
        var dbo = database.db("GymBuddyDB");
        var collection = dbo.collection('users');

        try {
            theQuery = "";
            queryOptions = "";
            theQuery = {Age: age};
            queryOptions = {sort:{Age:1}, projection:{_id:0, Age:1, Gender: 1, workout_type: 1, Name: 1, Number: 1}};
            t += `<h1>Your workout partner is: `;

            var result = await collection.find(theQuery, queryOptions).toArray();

            if (result.length === 0) {
                console.log(`No results found`);
                t += `No results found.`;
            } else {
                result.forEach(function (curr) {
                    console.log(`${curr.Name} has age ${curr.Age}`);
                    t += `${curr.Name}</h1>`;
                    t += `<h2>Contact them at: ${curr.Number}</h2>`;
                });
            }
        }

        finally {
            console.log(t);
            t += `</body>`;
            res.end(t);
            database.close();
        }
    });
}
