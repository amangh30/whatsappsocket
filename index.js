import {Server} from "socket.io"

const  io = new Server(9000,{
    cors:{
        origin:'https://658d7641c10e810068a47761--endearing-sable-67eb9d.netlify.app/'
    }
})

let users = [];

const addUser = (userData,socketId)=>{
    !users.some(user => user.sub == userData.sub) && users.push({...userData,socketId});
}

const getUser = (userId)=>{
    return users.find(user => user.sub ===userId);
}

io.on('connection',(socket)=>{
    console.log("user connected")
    socket.on("addUsers",userData =>{
        addUser(userData,socket.id)
        io.emit("getUsers",users);
    })
    
    socket.on('sendMessage',data =>{
        const user = getUser(data.receiverId)
        io.to(user?.socketId).emit('getMessage',data)
    })
})
