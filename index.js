var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");

app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.get("/", function (request, response) {
  try {
    var text = "";
    Object.keys(request.cookies).forEach(function (k) {
      text += `<br>${k}=${request.cookies[k]}`;
    });
    response.send("!Hello World!\n" + text);
  } catch (e) {
    response.send(e.stack);
  }
});
app.get("/test", function (request, response) {
  try {
    var text = "";
    Object.keys(request.cookies).forEach(function (k) {
      text += `<br>${k}=${request.cookies[k]}`;
    });
    response.send(
      "test!\n" +
        text +
        "<br><iframe src='https://thirdcookie.herokuapp.com/redirect?status=302&path=/'></iframe>"
    );
  } catch (e) {
    response.send(e.stack);
  }
});
app.get("/refresh", function (request, response) {
  try {
    const path = request.query.path || "/";
    response.send(
      //      "<html><body><script>location.href='" + path + "';</script></body></html>"
      `<html><head><meta http-equiv=refresh content=2;URL=${path} /></head><body>loading</body></html>`
    );
  } catch (e) {
    response.send(e.stack);
  }
});
app.get("/redirect", function (request, response) {
  try {
    const status = request.query.status || "301";
    const path = request.query.path || "/";
    response.redirect(parseInt(status), path);
  } catch (e) {
    response.send(e.stack);
  }
});
app.get("/setCookie", function (request, response) {
  try {
    let opt = {
      secure: request.query.secure === "true",
      httpOnly: request.query.httponly === "true",
    };
    if (request.query.domain) {
      opt.domain = request.query.domain;
    }
    if (request.query.path) {
      opt.path = request.query.path;
    }
    if (request.query.samesite) {
      opt.sameSite = request.query.samesite;
    }
    response.cookie(request.query.name, request.query.value, opt);

    var href = `/setCookie?name=${request.query.name}&value=${request.query.value}&domain=${request.query.domain}&path=${request.query.path}&secure=${request.query.secure}&httponly=${request.query.httponly}&samesite=${request.query.samesite}`;
    response.send(`K!<br><a href=${href}>${href}</a>`);
  } catch (e) {
    response.send(e.stack);
  }
});
app.get("/setResponse", function (request, response) {
  try {
    var text = "";
    Object.keys(request.cookies).forEach(function (k) {
      text += `<br>${k}=${request.cookies[k]}`;
    });
    response.send("Hello World!\n" + text);
  } catch (e) {
    response.send(e.stack);
  }
});
app.listen(app.get("port"), function () {
  console.log("Node app is running at localhost:" + app.get("port"));
});
