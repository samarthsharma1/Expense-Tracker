async function expenseDetails(event){
    event.preventDefault();
    
    let expenseDetails = {
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
      };
    console.log(expenseDetails);
    const data=await axios.post("http://localhost:3000/addexpense", expenseDetails)
    if(data.status===201){
        console.log(data.data);
          alert(data.data.message)
    addonScreen(data.data.expense);
        }
        else{
            alert(data.data)
           } 
    
    }
    function addonScreen(expense){
    
        const d=document.getElementById('ul')
        const p=`expense-${expense.id}`

        const li= `<li id="${p}" class="expenses1"> Rs.${expense.amount}====Category====>${expense.category}====Description====>${expense.description}
         
         <button onclick = deleteUser('${expense.id}') style="color:white; float:right ;margin-right:150px; background-color:black" class="bttn"> Delete </button> 
          </li>`
     
    d.innerHTML= d.innerHTML+ li ;
       }
       window.addEventListener('DOMContentLoaded',()=>{
        axios.get("http://localhost:3000/getexpense")
        .then(response=>{
            response.data.expenses.forEach(expense=>{
                addonScreen(expense)
            })
        })
       })
    
       function deleteUser(expenseid){
        axios.delete(`http://localhost:3000/deleteuser/${expenseid}`).then(()=>{
            removeuserfromScreen(expenseid);
            console.log('done')
        })
    
       }
       function removeuserfromScreen(expenseid){
    const expenseElemid=`expense-${expenseid}`
    document.getElementById(expenseElemid).remove();
    
    }