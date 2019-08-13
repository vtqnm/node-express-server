const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/' , function(req, res) {
  res.render('index', {title: 'Welcome'});
});

app.get('/about' , function(req, res) {
  res.render('about');
});

app.get('/contact' , function(req, res) {
  res.render('contact');
});

app.post('/contact/send' , function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'email@email.ru',
      pass: 'password'
    }
  });

  var mailOptions = {
    from: 'Message <email@email.com>',
    to: 'to.email@gmail.com',
    subject: 'Message from site.ru',
    text: 'Name: '+req.body.name+'Email: '+req.body.email+'Сообщение: '+req.body.message,
    html: '<p>Message from site.ru</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log(`Message send: ${info.response}`);
      res.redirect('/');
    }
  })
});

app.listen(3000);
console.log('Server in running on port 3000');

