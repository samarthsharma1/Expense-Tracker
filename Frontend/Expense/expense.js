async function expenseDetails(event){
    event.preventDefault();
    
    let expenseDetails = {
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        userId:1
      };
    console.log(expenseDetails);
    const token=localStorage.getItem('token')
    const data=await axios.post("http://localhost:3000/addexpense", expenseDetails,{headers:{"Authorization":token}})
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
         
         <button onclick = deleteUser('${expense.id}') class="bttn"> Delete </button> 
          </li>`
     
    d.innerHTML= d.innerHTML+ li ;
       }
       window.addEventListener('DOMContentLoaded',()=>{
        const token=localStorage.getItem('token')
        axios.get("http://localhost:3000/getexpense",{headers:{"Authorization":token}})
        .then(response=>{
            response.data.expenses.forEach(expense=>{
                addonScreen(expense)
            })
        })
       })
    
       function deleteUser(expenseid){
        const token=localStorage.getItem('token')
        axios.delete(`http://localhost:3000/deleteuser/${expenseid}`,{headers:{"Authorization":token}}).then(()=>{
            removeuserfromScreen(expenseid);
            console.log('done')
        })
    
       }
       function removeuserfromScreen(expenseid){
    const expenseElemid=`expense-${expenseid}`
    document.getElementById(expenseElemid).remove();
    
    }