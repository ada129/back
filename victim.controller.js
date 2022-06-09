const db=require('../db')
class VictimController{
    //добавление потерповшего по делу
    async Createvictim(req,res){
        if (!req.body){return res.status(400).json('вы ничего не ввели')}
        const {name,passport,date_of_birth,number_case,id}=req.body
        try{
        let Victim=await db.query('INSERT INTO private.victim (name,passport,date_of_birth,number_case,id_victim) values ($1,crypt($2,gen_salt(\'xdes\')),$3,$4,$5)  RETURNING *',[name,passport,date_of_birth,number_case,id])
            return res.status(200).json(Victim.rows[0])}
        catch (e){return res.status(505).json(e)}}
    //вывод всех потерпевших по делу
    async GetALL(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try {
        let Victims=await db.query('SELECT * FROM private.victim WHERE number_case=$1',[id])
        if (Victims==null){res.status(400).json('дела не сущетвует')}
            return res.status(200).json(Victims.rows)}
        catch (e){res.status(505).json(e)}
    }
    //изменение данных жертвы
    async Editvictim(req,res){
        let id=req.query.id
        if (!id && !req.body){return res.status(400).json('вы ничего не ввели')}
        try{
        let {date_of_birth,number_case,name}=req.body
        if (date_of_birth!==null){await db.query('UPDATE private.victim set date_of_birth=$1 WHERE passport=$2',[date_of_birth,id])}
        if (number_case!==null){await db.query('UPDATE private.victim set number_case=$1 WHERE passport=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.victim set name=$1 WHERE passport=$2',[name,id])}
        let Victim=await db.query('SELECT * FROM private.victim WHERE passport=$1',[id])
            return res.status(200).json(Victim.rows[0])}
        catch (e){res.status(505).json(e)}
    }
    //удаление потерпевшего
    async Deletevictim(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try {
        await db.query('DELETE  FROM private.victim WHERE passport=$1',[id])
            return res.status(200).json('выполенно')}
        catch (e) {return res.status(505).json(e)}
    }

}
module.exports=new VictimController()