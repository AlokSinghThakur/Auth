const userModule = require('../models').userModel

module.exports = {
    async getUserByUSername(username){
        return await userModule.findOne({where:{username:username}})
    },

    async signup(data){
        return await userModule.create(data)
    },

    async getUserById(id){
        return await userModule.findOne({
            where: { id: id },
            
        })
    },

    async getUserData(){
        return await userModule.findAll()
    }
}