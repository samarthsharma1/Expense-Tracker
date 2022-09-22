let express=require('express');

let bodyParser=require('body-parser');

let bcrypt=require('bcrypt');
let cors=require('cors');
const sequelize = require("./models/database");

let app=express();
let SignUpLogin=require('./routes/usersignup');
let Expenseroute=require('./routes/expense');

app.use(bodyParser.json());
app.use(cors());
app.use(SignUpLogin); 
app.use(Expenseroute);
 


sequelize
  .sync()
  //.sync({force:true})
  .then((result) => {
    // console.log(result);
    app.listen(3000, () => {
      console.log(" listening to 3000 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
 
 





