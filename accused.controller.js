const db=require('../db')
class AccusedController{
    //добавление нового подсудимого
    async Createaccused(req,res){
        if (!req.body){return  res.status(400).json('Вы нечего не ввели')}
        try{
        const {name,passport,date_of_birth,measure,characteristic,number_case,id}=req.body
        let Accused=await db.query('INSERT INTO private.accused (name,passport,date_of_birth,measure,characteristic,number_case,id_accused) values ($1,crypt($2,gen_salt(\'xdes\')),$3,$4,$5,$6,$7)  RETURNING *',[name,passport,date_of_birth,measure,characteristic,number_case,id])
        return  res.status(200).json(Accused.rows[0])}
        catch (e){return  res.status(505).json(e)}
    }
    //Вывод всех подсудимых по делу
    async GetALL(req,res){
        let id=req.query.id
        if (!id && typeof id==='string'  ){return  res.status(404).json('повторите ввод')}
        try {
        let Accused=await db.query('SELECT * FROM private.accused WHERE number_case=$1',[id])
          return  res.status(200).json(Accused.rows)}
        catch (e) { return res.status(505).json(e)}
    }
    //изменение данных конкретного обвиняемого
    async Editaccued(req,res){
        let id=req.query.id
        if (!id){return  res.status(404).json('вы ничего не ввели')}
        let {date_of_birth,measure,characteristic,number_case,name}=req.body
        if (date_of_birth!==null){await db.query('UPDATE private.accused set date_of_birth=$1 WHERE passport=$2',[date_of_birth,id])}
        if (measure!==null){await db.query('UPDATE private.accused set measure=$1 WHERE passport=$2',[measure,id])}
        if (characteristic!==null){await db.query('UPDATE private.accused set characteristic=$1 WHERE passport=$2',[characteristic,id])}
        if (number_case!==null){await db.query('UPDATE private.accused set number_case=$1 WHERE passport=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.accused set name=$1 WHERE passport=$2',[name,id])}
        let Accused=await db.query('SELECT * FROM private.accused WHERE passport=$1',[id])
        res.status(200).json(Accused.rows[0])
    }
    //удаление обвиняемого
    async Deleteaccued(req,res){
        let id=req.query.id
        if (!id){ return res.status(404).json('вы ничего не ввели')}
        try{
        await db.query('DELETE  FROM private.accused WHERE passport=$1',[id])
        return  res.status(200).json('выполненно')}
        catch (e) {return  res.status(505).json(e)}
    }
}
module.exports=new AccusedController()