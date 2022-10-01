window.addEventListener("DOMContentLoaded", () => {
    let div = document.getElementById("predetails");

    axios
      .get("http://localhost:3000/expense/getallusers")
      .then((response) => {
        //   console.log(response);
        for (let i = 0; i < response.data.users.length; i++) {
          let userid = response.data.users[i].id;
          let name = response.data.users[i].name;

          let content = `<div class="Aexp">
             <span class="span">${userid}</span>
             <span class="span">${name}</span>
             <button type="submit" onclick="seeexp(${userid})" class="span pre">View Expense</button>
             </div>`;
          div.innerHTML += content;
        }

        // pop up
        const open = document.getElementsByClassName("span pre");
        for (let i = 0; i < open.length; i++) {
          open[i].addEventListener("click", () => {
            container.classList.add("active");
          });
        }
        const close = document.getElementById("close");
        const container = document.getElementById("container");

        close.addEventListener("click", () => {
          container.classList.remove("active");
        });
      })

      .catch((err) => {
        console.log(err);
      });
  });

  function seeexp(userid) {
    axios
      .get(`http://localhost:3000/expense/getallexpense/${userid}`)
      .then((response) => {
        let parent = document.getElementById("popin");
        let content = '';
      //   console.log(parent);
        console.log(response)
        for (let i = 0; i < response.data.users.length; i++) {
          let amount = response.data.users[i].amount;
          let description = response.data.users[i].description;
          let category = response.data.users[i].category;
          content = `<div class="mydiv">
            <span class="popexp">${amount}</span>
            <span class="popexp">${description}</span>
            <span class="popexp">${category}</span>
            </div>`;
            parent.innerHTML += content;
          }

      });
  }