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
let toolboxColors = document.querySelectorAll(".color");
let ticketArray = [];
//Listerner for modal coloring
for (let i = 0; i < toolboxColors.length; i++) {
  toolboxColors[i].addEventListener("click", (e) => {
    let currentToolBoxColor = toolboxColors[i].classList[0];
    let filteredTickets = ticketArray.filter((ticketobj, idx) => {
      return currentToolBoxColor === ticketobj.ticketColor;
    });
    // remove prev ticket
    let allTicketCount = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketCount.length; i++) {
      allTicketCount[i].remove();
    }
    // display new filtered tickets
    filteredTickets.forEach((ticketobj, idx) => {
      createTicket(
        ticketobj.ticketColor,
        ticketobj.ticketTask,
        ticketobj.ticketID
      );
    });
  });
  toolboxColors[i].addEventListener("dblclick", (e) => {
    let allTicketCount = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketCount.length; i++) {
      allTicketCount[i].remove();
    }
    ticketArray.forEach((ticketobj, idx) => {
      createTicket(
        ticketobj.ticketColor,
        ticketobj.ticketTask,
        ticketobj.ticketID
      );
    });
  });
}
allPriorityColor.forEach((colorEle, idx) => {
  colorEle.addEventListener("click", (e) => {
    allPriorityColor.forEach((priorityColrEle, idx) => {
      priorityColrEle.classList.remove("border");
    });
    colorEle.classList.add("border");
    modalPriorityColor = colorEle.classList[0];
  });
});

for (let i = 0; i < toolboxColors.length; i++) {
  toolboxColors[i].addEventListener("click", (e) => {
    let currentTollBoaxColor = toolboxColors[i].classList[0];
  });
}

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
  let id = ticketID || shortid();
  // let ticketCont = document.createElement("div");
  ticketCount.setAttribute("class", "ticket-cont");
  ticketCount.innerHTML = `

  <div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-id">#${id}</div>
  <div class="task-area">${ticketTask}</div>
  <div class="ticket-lock">
  <i class="fa-solid fa-lock"></i> </div>`;
  mainCont.appendChild(ticketCount);
  // create object of array and add to array
  if (!ticketID) ticketArray.push({ ticketColor, ticketTask, ticketID: id });
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
    createTicket(modalPriorityColor, textAreaCont.value);
    // modal.style.display = "none";
    // textAreaCont.value = "";
    flag = false;
    setModalDefualt();
  }
});
function setModalDefualt() {
  modal.style.display = "none";
  textAreaCont.value = "";
  modalPriorityColor = color[color.length - 1];
  allPriorityColor.forEach((priorityColrEle, idx) => {
    priorityColrEle.classList.remove("border");
  });
  allPriorityColor[allPriorityColor.length - 1].classList.add("border");
  // let allTicketCount = document.querySelectorAll(".ticket-cont");
  // for (let i = 0; i < allTicketCount.length; i++) {
  //   allTicketCount[i].remove();
  // }
  // allPriorityColor[allPriorityColor.length - 1].classList.add("border");
}
