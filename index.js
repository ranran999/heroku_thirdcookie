var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    const text = Object.keys(request.cookies).map(k=>`${k}=${request.cookies[k]}<br>`).join("\n")
  response.send('Hello World!\n' + text)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});