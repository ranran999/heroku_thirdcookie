var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser())

app.get('/', function(request, response) {
    try{
        
        var text = "";
        Object.keys(request.cookies).forEach(function(k){
            text += `${k}=${request.cookies[k]}<br>`
        });
        response.send('Hello World!\n' + text)
    }catch(e){
        response.send(e.stack)
    }
    
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});