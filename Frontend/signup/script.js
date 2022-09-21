async function createUser(event){
try{
  event.preventDefault()
  
  let name=document.getElementById('name').value
  let email=document.getElementById('email').value
  let password=document.getElementById('password').value

    let obj={
        name:name,
        email:email,
        password:password
    };

const result= await axios.post("http://localhost:3000/signup",obj)
      
     if(result.status==201)
      {
        console.log("Signup Done");
        alert(result.data.message);
        window.location.href='../Login/login.html';
      }
      else{
       // throw new Error('Something went wrong')
       document.body.innerHTML+=`<div style="color:red;">${result.data.message}</div>:`
      }
    }
      catch(err) {
        document.body.innerHTML+=`<div style="color:red;">${err.message}</div>:`
        alert(err);
      }
}
