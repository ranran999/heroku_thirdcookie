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
            text += `<br>${k}=${request.cookies[k]}`
        });
        response.send('Hello World!\n' + text)
    }catch(e){
        response.send(e.stack)
    }
    
});
app.get('/setCookie', function(request, response) {
    try{
        response.cookie(request.params.name, request.params.value, { domain: request.params.domain, path: request.params.path, secure: request.params.secure === "true" })
        var href = `/setCookie?name=${request.params.name}&value=${request.params.value}&domain=${request.params.domain}&path=${request.params.path}&secure=${request.params.secure}`
        response.send(`K!<br><a href=${href}>${href}</a>`)
        
    }catch(e){
        response.send(e.stack)
    }
    
});
app.get('/setResponse', function(request, response) {
    try{
        var text = "";
        Object.keys(request.cookies).forEach(function(k){
            text += `<br>${k}=${request.cookies[k]}`
        });
        response.send('Hello World!\n' + text)
    }catch(e){
        response.send(e.stack)
    }
    
});
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});