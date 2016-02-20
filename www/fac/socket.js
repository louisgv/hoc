function SocketServ (socketFactory) {
  console.log('SocketServ');

  var mis = io.connect('https://quan-api.mybluemix.net/');
  // var mis = io.connect('http://localhost:1314/');

  mySocket = socketFactory({
    ioSocket : mis,
  });

  return mySocket;
}
