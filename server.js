var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());

  app.use(express.static(__dirname + '/public'));
});

app.get('*', function(req, res){
  res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port);