let express=require('express');
let router = express.Router();
let Controllers=require('../controllers/signuplogin');


router.post('/signup',Controllers.signup);

router.post('/login',Controllers.login)

module.exports=router;