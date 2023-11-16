<script lang="ts">
      import { onMount,afterUpdate } from 'svelte';
      import axios from 'axios';
	import type { User } from '$lib/session';
	import type { Message } from '../../types';
    import io from 'socket.io-client';
    import type { Socket } from 'socket.io-client';
	import { goto } from '$app/navigation';
      let users: User[] = [];
      let user: User | null = null;
      let messages:Message[]=[]
      let MessageUser:User |null=null
      let sentMessage:string=''
      let recieverid:string=""
      let socket:Socket;
      socket = io('http://localhost:5000');

// Listen for the 'connect' event
socket.on('connect', () => {
  console.log('Socket connected');
});

// Listen for the 'disconnect' event
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});
socket.on('welcome', (welcomeMessage) => {
    console.log('Received welcome message:', welcomeMessage);
  });
  socket.on('message', (message) => {
    console.log('Received message', message);
    if ((message.Sender===user?._id && message.Receiver==recieverid) || (message.Sender===recieverid && message.Receiver==user?._id))
    {
        messages=[...messages,message]
    }
    
    // Handle the received message as needed
  });

      

      const FetchUsers = async () => {
 
   try {
     const response = await axios.get("http://localhost:5000/user/all");
    
     if (response.status === 200) {
        users=response.data
        
            
   
     
      
     } else {
        console.log("cant fetch")
       
     }

   } catch (error:any) {
    console.log(error)
   
   }
 
 
 };
 
 const  handleClick = async (userId: string) => {
    const responseUser=await axios.get(`http://localhost:5000/user/profile/${userId}`)
    recieverid=userId
    
    MessageUser=responseUser.data
    // Handle click logic here
  

    let formdata={
        Sender:userId,
        Receiver:user?._id
    }
    const response=await axios.post("http://localhost:5000/msg/all",formdata)
    messages=response.data

  };
  const handleSubmit=async(e:Event)=>{
    
    e.preventDefault()
    var formdata={
        Sender:user?._id,
        Receiver:MessageUser?._id,
        Content:sentMessage
    }
    const response=await axios.post("http://localhost:5000/msg/send",formdata)
  sentMessage=''
  }
  const logout=()=>{
    localStorage.clear()
    goto("/login")
  }





  


  onMount(async () => {
    // Replace the URL with your server URL
   
    await FetchUsers();

    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      user = storedUser ? JSON.parse(storedUser) : null;

     
        // Filter out the user based on the _id
        users = users.filter((userMAN: User) => userMAN._id !== user?._id);
  

    // Listen for the 'message' event
   
        
      
    }
 
  });
//   afterUpdate(() => {
//     if (user?._id) {
//       console.log("Joining room");
//       socket.emit('joinRoom', { room: user._id });
//       console.log("room joined")
//       console.log("starting log")
//       socket.on('message', (message) => {
//       console.log('Received message in room:', user?._id, message);
//       console.log("finished")
//       // Handle the received message as needed
//     });
//     }
 
//   });



</script>
<style>
  
    .card {
        background: #fff;
        transition: .5s;
        border: 0;
        margin-bottom: 30px;
        border-radius: .55rem;
        position: relative;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    }
    .chat-app .people-list {
        width: 280px;
        position: absolute;
        left: 0;
        top: 0;
        padding: 20px;
        z-index: 7
    }
    
    .chat-app .chat {
        margin-left: 280px;
        border-left: 1px solid #eaeaea
    }
    
    .people-list {
        -moz-transition: .5s;
        -o-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s
    }
    
    .people-list .chat-list li {
        padding: 10px 15px;
        list-style: none;
        border-radius: 3px
    }
    
    .people-list .chat-list li:hover {
        background: #efefef;
        cursor: pointer
    }
    
    .people-list .chat-list li.active {
        background: #efefef
    }
    
    .people-list .chat-list li .name {
        font-size: 15px
    }
    
    .people-list .chat-list img {
        width: 45px;
        border-radius: 50%
    }
    
    .people-list img {
        float: left;
        border-radius: 50%
    }
    
    .people-list .about {
        float: left;
        padding-left: 8px
    }
    
    .people-list .status {
        color: #999;
        font-size: 13px
    }
    
    .chat .chat-header {
        padding: 15px 20px;
        border-bottom: 2px solid #f4f7f6
    }
    
    .chat .chat-header img {
        float: left;
        border-radius: 40px;
        width: 40px
    }
    
    .chat .chat-header .chat-about {
        float: left;
        padding-left: 10px
    }
    
    .chat .chat-history {
        padding: 20px;
        border-bottom: 2px solid #fff
    }
    
    .chat .chat-history ul {
        padding: 0
    }
    
    .chat .chat-history ul li {
        list-style: none;
        margin-bottom: 30px
    }
    
    .chat .chat-history ul li:last-child {
        margin-bottom: 0px
    }
    
    .chat .chat-history .message-data {
        margin-bottom: 15px
    }
    
    .chat .chat-history .message-data img {
        border-radius: 40px;
        width: 40px
    }
    
    .chat .chat-history .message-data-time {
        color: #434651;
        padding-left: 6px
    }
    
    .chat .chat-history .message {
        color: #444;
        padding: 18px 20px;
        line-height: 26px;
        font-size: 16px;
        border-radius: 7px;
        display: inline-block;
        position: relative
    }
    
    .chat .chat-history .message:after {
        bottom: 100%;
        left: 7%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: #fff;
        border-width: 10px;
        margin-left: -10px
    }
    
    .chat .chat-history .my-message {
        background: #efefef
    }
    
    .chat .chat-history .my-message:after {
        bottom: 100%;
        left: 30px;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: #efefef;
        border-width: 10px;
        margin-left: -10px
    }
    
    .chat .chat-history .other-message {
        background: #e8f1f3;
        text-align: right
    }
    
    .chat .chat-history .other-message:after {
        border-bottom-color: #e8f1f3;
        left: 93%
    }
    
    .chat .chat-message {
        padding: 20px
    }
    
    .online,
    .offline,
    .me {
        margin-right: 2px;
        font-size: 8px;
        vertical-align: middle
    }
    
    .online {
        color: #86c541
    }
    
    .offline {
        color: #e47297
    }
    
    .me {
        color: #1d8ecd
    }
    
    .float-right {
        float: right
    }
    
    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0
    }
    
    @media only screen and (max-width: 767px) {
        .chat-app .people-list {
            height: 465px;
            width: 100%;
            overflow-x: auto;
            background: #fff;
            left: -400px;
            display: none
        }
        .chat-app .people-list.open {
            left: 0
        }
        .chat-app .chat {
            margin: 0
        }
        .chat-app .chat .chat-header {
            border-radius: 0.55rem 0.55rem 0 0
        }
        .chat-app .chat-history {
            height: 300px;
            overflow-x: auto
        }
    }
    
    @media only screen and (min-width: 768px) and (max-width: 992px) {
        .chat-app .chat-list {
            height: 650px;
            overflow-x: auto
        }
        .chat-app .chat-history {
            height: 600px;
            overflow-x: auto
        }
    }
    
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
        .chat-app .chat-list {
            height: 480px;
            overflow-x: auto
        }
        .chat-app .chat-history {
            height: calc(100vh - 350px);
            overflow-x: auto
        }
    }
    </style>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Chat app</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/">Action</a>
                    <a class="dropdown-item" href="/">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/">Something else here</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="/">Disabled</a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <div class="dropdown p-2">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {user?.name} {user?.LastName}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="/" on:click={logout}>Logout</a>
               
                </div>
              </div>
            </div>
          </nav>
    </header>
    
    <div class="container-fluid" style="margin-top:2%">
    <div class="row clearfix">
        <div class="col-lg-12">
            <div class="card chat-app" style="min-height:80vh">
                <div id="plist" class="people-list">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search...">
                    </div>
                    <ul class="list-unstyled chat-list mt-2 mb-0">
                        <li class="clearfix">
                            {#each users as user (user._id)}
                            <a href="#!" on:click={() => user && user._id && handleClick(user._id)}>
                              <div class="row mb-4">
                                <div style="display:flex;justify-content:center;align-items:center;height:40px;width:40px;background-color:purple;border-radius:7px;color:white">
                                  {user ? user.name.substring(0, 1) : ''}
                                </div>
                                <div class="about">
                                  <div class="name text-dark ">{user ? `${user.name} ${user.LastName}` : ''}</div>
                                  <div class="status">
                                    <i class="fa fa-circle offline"></i> left 7 mins ago
                                  </div>
                                </div>
                              </div>
                            </a>
                          {/each}
                          
                          
                         
                            
                        </li>
                    
                    </ul>
                </div>
                <div class="chat">
                    <div class="chat-header clearfix">
                        <div class="row">
                            <div class="col-lg-6">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar">
                                </a>
                                <div class="chat-about">
                                    {#if MessageUser==null}
                                    <h6 class="m-b-0 text-dark ">User</h6>
                                    <small class="text-dark">Message User</small>
                                    {:else}
                                    <h6 class="m-b-0 text-dark ">{MessageUser?.name} {MessageUser?.LastName}</h6>
                                    <small class="text-dark">Chat with {MessageUser?.name}</small>
                                    {/if}
                                </div>
                            </div>
                            <div class="col-lg-6 hidden-sm text-right">
                                <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="chat-history" style="overflow-y:auto;height:600px">
                        <ul class="m-b-0">
                            {#each messages as message(message?._id)}
                            {#if message?.Sender==user?._id}
                            <li class="clearfix">
                                <div class="message-data text-right">
                                    <span class="message-data-time">{message.timestamp.toString().replace("T"," ").split(".")[0].substring(0,16)}</span>
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
                                </div>
                                <div class="message other-message float-right"> {message.Content} </div>
                            </li>
                          
                         
                         
                            {:else}
                            <li class="clearfix">
                                <div class="message-data">
                                    <span class="message-data-time">{message.timestamp.toString().replace("T"," ").split(".")[0].substring(0,16)}</span>
                                </div>
                                <div class="message my-message">{message.Content}</div>                                    
                            </li>  
                      
                          
                            {/if}
                            {/each}
                          
                                                     
                        
                        </ul>
                    </div>
                    <form on:submit={handleSubmit}>
                    <div class="chat-message clearfix">
                        <div class="input-group mb-0">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-send"></i></span>
                            </div>
                            <input type="text" class="form-control" bind:value={sentMessage} placeholder="Enter text here...">                                    
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
    </div>