let name1=document.querySelector('#name');
let email1=document.querySelector('#email');
let pwd1=document.querySelector('#pwd');
let btnsubmit=document.querySelector('#btnsubmit');

btnsubmit.addEventListener('click',(e)=>{
    e.preventDefault();

    let name=name1.value;
    let email=email1.value;
    let pwd=pwd1.value;

    let obj={
        name:name,
        email:email,
        pwd:pwd
    };

    axios.post("http://localhost:8400/register",obj)
      .then((result) => {
       // console.log(result);
      
     
      if(result.data.success==true)
      {
        alert("Sign up Completed ! Please login to your account")
      }
      else{
        if(result.data.errors[0].message=='Email must be unique')
        {
          alert("User Already Exist so Please Login ");
        }
      }
    })
      .catch((err) => {
        console.log(err);
      });
})



