var app = require('express')(),
          http = require('http').createServer(app),
          io = require('socket.io')(http),
          port = process.env.PORT || 3000,
          publicDir = `${__dirname}/public`

http.listen(port, () => {
	console.log('Treaming Video on localhost: %d', port)
})     

app.get('/', (req, res) => {
   	res.sendFile(`${publicDir}/client.html`)
   })
   .get('/streaming', (req, res) => {
   	res.sendFile(`${publicDir}/server.html`)
   })


//mảng chưa client
  arr=[];



io.on('connection', function(socket){
  //kết nối mới
  console.log("New connection: "+socket.id);

    //ngăt kết nối
    socket.on("disconnect",function(){
    console.log("disconnect: "+socket.id);
    })


  socket.on("Device",function(data){
    console.log("Nhan Du lieu")
    console.log(data);

    //Client ket noi
    if(data=="Client") {
      console.log("Ket noi moi tu client");
      arr=[];
      arr.push(socket.id);
      console.log(arr);
    }
    //Server ket noi
    else if(data=="Server"){
      console.log("Ket noi moi tu Server");
    }

  })

  socket.on('streaming', function(image){
    //gửi đến client
    io.to(arr).emit('play stream', image)

  })


   })
//hú thái server chạy là localhost:3000/streaming nữa