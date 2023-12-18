import React,{useState,useEffect, useMemo} from 'react'

const Chat=({socket,username,room})=> {
    const [currentMessage,setCurrentMessage]=useState();
    const [messages,setmessagesList]=useState([]);
     
    const sendMessage= async()=>{
        if(currentMessage !==""){
            const messageData={
                message:currentMessage,
                author:username,
                room:room,
                time: new Date(Date.now()).getHours() + ": " + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message",messageData);
            setmessagesList((list)=>[...list,messageData])
        }
         

    }
    const recieveHandler=useMemo(()=>{
      return(data)=>{
         setmessagesList((list)=>[...list,data])
      }
    },[socket])
    useEffect(()=>{
     socket.on("recieve_message", recieveHandler);
      return ()=>{
        socket.off("recieve_message", recieveHandler);
      }
    },[socket])
  return (
     <div className='chat-window'> 
    <div className='chat-header'>
      Chat
    </div>
    <div className='chat-body'>
      {messages.map((messageContent)=>{
        return (
        <div><h1>{messageContent.message}</h1> 
        <h3 style={{fontSize:12}}>{messageContent.time}</h3>
        <h3>{messageContent.author}</h3>
        </div>
         
        )
         
        
      })}
       
    </div>
    <div className='chat-footer'>
        <input type="text" placeholder='Enter message' onChange={(e)=>setCurrentMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>

    </div>
    </div> 
     
  )
}

export default Chat