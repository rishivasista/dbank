import {
  dbank
} from "../../declarations/dbank";


window.addEventListener("load", async () => {
  dbank.compound();
  await update(); 
});


document.querySelector("form").addEventListener("submit", async (event) => {
  // console.log("Submitted");
  event.preventDefault();

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);
  
  if(document.getElementById("input-amount").value.length!=0)
      await dbank.topUp(inputAmount);
  
  if(document.getElementById("withdrawal-amount").value.length!=0)
      await dbank.withdraw(outputAmount);
  
  await dbank.compound();
  await update();
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  
  
  button.removeAttribute("disabled");
});

async function update(){
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}