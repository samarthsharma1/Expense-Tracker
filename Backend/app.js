let express=require('express');

let bodyParser=require('body-parser');

let bcrypt=require('bcrypt');
let cors=require('cors');
const sequelize = require("./models/database");

const dotenv=require('dotenv')
dotenv.config();

let app=express();
let SignUpLogin=require('./routes/usersignup');
let Expenseroute=require('./routes/expense');
const User=require("./models/user")
const Order=require('./models/orders');
const Expense=require('./models/expense');

User.hasMany(Expense)
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

app.use(bodyParser.json());
app.use(cors());
app.use(SignUpLogin); 
app.use(Expenseroute);
 
const purchaseRoutes = require('./routes/purchase')
app.use('/purchase',purchaseRoutes)

sequelize
  .sync()
 // .sync({force:true})
  .then((result) => {
    // console.log(result);
    app.listen(3000, () => {
      console.log(" listening to 3000 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
 
 





