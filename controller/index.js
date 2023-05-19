const userQueries = require('../queries')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async signup(req,res){
        let username = req.body.username;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let password = req.body.password

         password = await bcrypt.hash(password,10)
        if(!username){
            return res
        .status(422)
        .send({ code: 422, status: "failed", msg: "Username is required" });
        }

        try {
            let data = {
                username:username,
                email:email,
                mobile:mobile,
                password:password
            }
            let userExist = await userQueries.getUserByUSername(username)
            if (userExist && userExist != null) {
                res
                  .status(422)
                  .send({ code: 422, status: "failed", msg: "User Already exist" });
              }

              
              await userQueries.signup(data);
              let userData = await userQueries.getUserByUSername(username)
              return res
          .status(200)
          .send({ code: 200, status: "success", data: userData });
      

        }catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
        
    },

    async login(req,res){
        let username = req.body.username;
        let password = req.body.password;
        if (!username || !password) return res.status(422).send({ code: 422, status: 'failed', msg: 'Data is required.' });

        try{
            let userExist = await userQueries.getUserByUSername(username)
            
            // console.log("object",userExist)
            let result = bcrypt.compareSync(password, userExist.password);
            if (result) {
                let payload = {
                    id: userExist.id, 
                      roles:"user"
                }
                let token = jwt.sign(payload, process.env.JWT_Key, { expiresIn: "500h" });
                return res.status(200).send({ code: 200, status: 'success', token: token });
            } else {
                return res.status(422).send({ code: 422, status: 'failed', msg: 'incorrect password' });
            }

        }catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }

    },

    async getUser(req,res){
        try{
            let userData = await userQueries.getUserData();
            return res.status(200).send({ code: 200, status: 'success', token: userData });
        }catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
    }
}