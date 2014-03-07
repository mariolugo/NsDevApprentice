var express = require('express'),
  mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());

  app.use(express.static(__dirname + '/public'));
});

mongoose.connect('mongodb://admin:welcome1@troup.mongohq.com:10039/alumnos');

// mongodb local
// mongoose.connect('mongodb://localhost/alumnos');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function () {
  console.log('Alumnos database open');
});

var messageSchema = mongoose.Schema({ message: String });
var Message = mongoose.model('Message', messageSchema);

var mongoMessage;

Message.findOne().exec(function (err, messageDoc) {
  mongoMessage = messageDoc.message;
});

app.get('*', function(req, res){
  res.render('index', {
    message: mongoMessage
  });
});

var port = process.env.PORT || 3031;
app.listen(port);

console.log('Listening on port ' + port);
