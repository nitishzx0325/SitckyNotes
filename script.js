console.log("Nameste js🙏");
let modal = document.querySelector(".modal-cont");
let addbtn = document.querySelector(".add-btn");
let flag = false;
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");
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
function createTicket() {
  let ticketCount = document.createElement("div");
  console.log("cccc!!!!");
  ticketCount.setAttribute("class", "ticket-cont");
  ticketCount.innerHTML = `
  <div class="ticket-color"></div>
  <div class="ticket-id">#4232323</div>
  <div class="task-area">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
    obcaecati officia autem ipsam possimus, corrupti ratione adipisci
    tempora exercitationem
  </div>
</div>`;
  mainCont.appendChild(ticketCount);
}
modal.addEventListener("keyup", function (e) {
  console.log(e.key);
  let p = e.key;
  if (p == "shift" || p == "Shift") {
    createTicket();
    modal.style.display = "none";
    flag = false;
    textAreaCont.value = "";
  }
});
