let name1=document.querySelector('#name');
let email1=document.querySelector('#email');
let pwd1=document.querySelector('#pwd');
let btnsubmit=document.querySelector('#btnsubmit');

btnsubmit.addEventListener('click',(e)=>{
    e.preventDefault();

    let name=name1.value;
    let email=email1.value;
    let password=pwd1.value;

    let obj={
        name:name,
        email:email,
        password:password
    };

    axios.post("http://localhost:3000/signup",obj)
      .then((result) => {
       // console.log(result);
      
     
      if(result.status==201)
      {
        console.log("Signup Done");
        window.location.href='../login.html'
      }
      else{
          alert("User Already Exist Or Something went wrong ");
      }
    })
      .catch((err) => {
        console.log(err);
      });
})



