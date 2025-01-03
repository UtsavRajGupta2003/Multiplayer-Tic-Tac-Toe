const socket=io();
const boxes=document.querySelectorAll(".box");
const msgBox=document.querySelector(".message-box");
let count=9;
let flag;
let otherUserId, roomId, symbol;
let winPattern=[
  [0,1,2],
  [0,3,6],
  [3,4,5],
  [1,4,7],
  [6,7,8],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
  socket.on("matched",(data)=>{
    let {room,otherUser,temp}=JSON.parse(data);
    msgBox.style.display="none";
    otherUserId=otherUser;
    roomId=room;
    flag=temp;
    symbol=(flag)?"X":"O";
  });
  
  socket.on("step",(data)=>{
      const {index}=JSON.parse(data);
      let box=boxes[index];
      box.textContent=(symbol==="X")?"O":"X";
      box.style.backgroundColor="transparent";
      box.style.borderColor="transparent";
      checkWin(box.textContent);
      box.disabled=true
      flag=!flag
      count--;
      if(count===0){
        msgBox.style.display="block";
        msgBox.textContent="tie "+String(box.textContent);
        resetBTN();
      }
  });

function resetBTN(){
  setTimeout(() => {
    boxes.forEach((box)=>{
      box.style.borderColor="black";
      box.disabled=false;
      box.textContent="";
    });
    count=9;
    symbol=(symbol==="O")?"X":"O";
    msgBox.style.display="none";
  }, 3000);
}

function checkWin(str){
  winPattern.forEach((value,index)=>{
    let first=boxes[value[0]].textContent;
    let second=boxes[value[1]].textContent;
    let third=boxes[value[2]].textContent;
    if( first!=="" && first===second && second===third){
        msgBox.style.display="block";
        msgBox.textContent="winner "+String(str);
        flag=!flag;
        resetBTN();
        return true;
    }
  });
  return false;
}

boxes.forEach((box,ind)=>{
  box.addEventListener("click",(e)=>{
    if(flag){
      box.textContent=symbol;
      checkWin(box.textContent);
      box.style.borderColor="transparent";
      box.style.backgroundColor="transparent";
      count--;
      if(count===0){
        msgBox.style.display="block";
        msgBox.textContent="tie "+String(box.textContent);
        resetBTN();
      } 
      box.disabled=true;
      socket.emit("move",JSON.stringify({
        index:ind,
        room:roomId,
      }));
      flag=!flag;
    }else{
      msgBox.style.display="block";
      msgBox.textContent="its not your turn";
      setTimeout(()=>{
        msgBox.style.display="none";
      },1700);
    }
  });
});


window.addEventListener("beforeunload",()=>{
  socket.disconnect();
});





