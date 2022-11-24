const express = require('express');
const httpServer = express();
const dialer = require('dialer').Dialer;
const config = {
  url: 'https://uni-call.fcc-online.pl',
  login: 'focus05',
  password: 'hw4tredbw4n'
};

const { Server } = require('socket.io')

const cors = require('cors');
const bodyParser = require('body-parser');






dialer.configure(config);

httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
 next();
});


const serverInstance = httpServer.listen(3000,function(){
    console.log('Example app listening on 3000 port');
    // url mozna generowac za pomoca gp url 3000
})
const io = new Server(serverInstance);
// definiowanie odp na request get

httpServer.post('/call/', async (req, res) => {
  const number1 = req.body.number;
  const number2 = '727623755' 
  console.log('Dzwonie', number1, number2)
  bridge = await dialer.call(number1, number2);
  let oldStatus = null
  let interval = setInterval(async () => {
    let currentStatus = await bridge.getStatus();
    if (currentStatus !== oldStatus) {
       oldStatus = currentStatus
       console.log(currentStatus)
       io.emit('status', currentStatus)
    }
    if (
      currentStatus === "ANSWERED" ||
      currentStatus === "FAILED" ||
      currentStatus === "BUSY" ||
      currentStatus === "NO ANSWER"
  ) {
      clearInterval(interval)
  }
 }, 1000)
 res.json({ id: '123', status: bridge.STATUSES.NEW 
 });
 })