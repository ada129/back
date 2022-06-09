const db=require('../db')
class UserController {
    //регистрация пользователя
    async autorizat(req, res) {
        if (!req.body){return res.status(404).json('вы ничего не ввели')}
        const {login, password} = req.body
        try {
        let user=await db.query('SELECT name from private.user where login=$1 and private.user.password=crypt($2,private.user.password)', [login,password])
        if (!user.rows.length){ return res.status(200).json('неверный логин или пароль')}
        res.status(200).json(user.rows)}
        catch (e) {return res.status(505).json(e)}
    }

}

module.exports=new UserController()