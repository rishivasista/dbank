import {
  dbank, dbank1_backend
} from "../../declarations/dbank1_backend";


window.addEventListener("load", async () => {
  dbank1_backend.compound();
  await update(); 
});

setInterval(()=>{
  location.reload();
  dbank1_backend.compound();
  update();
}, 60000);

document.querySelector("form").addEventListener("submit", async (event) => {
  // console.log("Submitted");
  event.preventDefault();

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);
  
  if(document.getElementById("input-amount").value.length!=0)
      await dbank1_backend.topUp(inputAmount);
  
  if(document.getElementById("withdrawal-amount").value.length!=0)
      await dbank1_backend.withdraw(outputAmount);
  
  await dbank1_backend.compound();
  await update();
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  
  
  button.removeAttribute("disabled");
});

async function update(){
  const currentAmount = await dbank1_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}