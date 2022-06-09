const db=require('../db')
class JuryController{
    //добавление присяжных
    async Createejurry(req,res){
        const {name,passport,number_case}=req.body
        try{
        let Jurry=await db.query('INSERT INTO private.jury (name,passport,number_case) values ($1,$2,$3)  RETURNING *',[name,passport,number_case])
            return res.status(200).json(Jurry.rows[0])}
        catch (e){return res.status(505).json(e)}}
    //вывод всех присяжных по делу
    async GetALL(req,res){
        let id=req.query.id
        if(!id ) {return res.status(404).json('вы ничего не ввели')}
        try{
        let Jurries=await db.query('SELECT name FROM private.jury WHERE number_case=$1',[id])
        if (Jurries==null){return res.status(200).json('не найден')}
            return res.status(200).json(Jurries.rows)}
        catch (e){return res.status(505).json(e)}
    }
    //изменение данных присяжного
    async Editejurry(req,res){
        let id=req.query.id
        let {number_case,name}=req.body
        if(!id && !req.body ) {return res.status(404).json('вы ничего не ввели')}
        if (number_case!==null){await db.query('UPDATE private.jury set number_case=$1 WHERE passport=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.jury set name=$1 WHERE passport=$2',[name,id])}
        let Jurry=await db.query('SELECT * FROM private.jury WHERE passport=$1',[id])
        return  res.status(200).json(Jurry.rows[0])
    }
    //удаление присяжного
    async DeleteJurry(req,res){
        let id=req.query.id
        if(!id ) {return res.status(404).json('вы ничего не ввели')}
        try{
        await db.query('DELETE  FROM private.jury WHERE passport=$1',[id])
            return res.status(200).json('выполнено')}
        catch (e){return res.status(505).json(e)}
    }

}
module.exports=new JuryController()