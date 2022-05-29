console.log("Nameste js🙏");
// console.log(print);
let modal = document.querySelector(".modal-cont");
let addbtn = document.querySelector(".add-btn");
let removebtn = document.querySelector(".remove-btn");
let flag = false;
let removeflag = false;
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");
let color = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = color[color.length - 1];
let allPriorityColor = document.querySelectorAll(".priority-color");
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
//Listerner for modal coloring
allPriorityColor.forEach((colorEle, idx) => {
  colorEle.addEventListener("click", (e) => {
    allPriorityColor.forEach((priorityColrEle, idx) => {
      priorityColrEle.classList.remove("border");
    });
    colorEle.classList.add("border");
    modalPriorityColor = colorEle.classList[0];
  });
});
addbtn.addEventListener("click", function (e) {
  console.log("clicked");
  // display ticket
  // generate ticket

  // flag=true---- display modal
  // flag==false------ diaply modal none
  flag = !flag;
  if (flag) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
});

removebtn.addEventListener("click", (e) => {
  removeflag = !removeflag;
});

function createTicket(ticketColor, ticketTask, ticketID) {
  let ticketCount = document.createElement("div");
  console.log("cccc!!!!");
  ticketCount.setAttribute("class", "ticket-cont");
  ticketCount.innerHTML = `

  <div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-id">#${ticketID}</div>
  <div class="task-area">${ticketTask}</div>
  <div class="ticket-lock">
  <i class="fa-solid fa-lock"></i> </div>`;
  mainCont.appendChild(ticketCount);
  handleRemoval(ticketCount);
  handlelock(ticketCount);
  handleColor(ticketCount);
}

function handleColor(ticket) {
  let ticketcolor = ticket.querySelector(".ticket-color");
  ticketcolor.addEventListener("click", (e) => {
    let currentTicketCoolor = ticketcolor.classList[1];
    let cuurentTicketColorIdx = color.findIndex((color) => {
      return currentTicketCoolor === color;
    });
    cuurentTicketColorIdx++;
    let newTicketcolorIdx = cuurentTicketColorIdx % color.length;
    let newTicketcolor = color[newTicketcolorIdx];
    ticketcolor.classList.remove(currentTicketCoolor);
    ticketcolor.classList.add(newTicketcolor);
  });
}
function handleRemoval(ticket) {
  // removal functionality
  if (removeflag) {
    ticket.remove();
  }
}
function handlelock(ticket) {
  let ticketLockEle = ticket.querySelector(".ticket-lock");
  let ticketLock = ticketLockEle.children[0];
  let ticketTaskArea = ticket.querySelector(".task-area");
  ticketLock.addEventListener("click", (e) => {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contenteditable", "true");
    } else {
      ticketLock.classList.remove(unlockClass);
      ticket.classList.add(lockClass);
      ticketTaskArea.setAttribute("contenteditable", "false");
    }
  });
}

modal.addEventListener("keyup", function (e) {
  console.log(e.key);
  let p = e.key;
  if (p == "shift" || p == "Shift") {
    createTicket(modalPriorityColor, textAreaCont.value, shortid());
    modal.style.display = "none";
    flag = false;
    textAreaCont.value = "";
  }
});
