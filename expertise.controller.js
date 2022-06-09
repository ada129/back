const db=require('../db')
class ExpertiseController{
    //добаление новой экспертизы по делу
    async Createexpertie(req,res){
        if (!req.body){return res.status(400).json('вы ничего не ввели')}
        const {name_examination,number_examination,id_worker,conclusion,number_case}=req.body
        try{
        let Expertise=await db.query('INSERT INTO private.expertise (name_examination,number_examination,id_worker,conclusion,number_case) values ($1,$2,$3,$4,$5)  RETURNING *',[name_examination,number_examination,id_worker,conclusion,number_case])
            return res.status(200).json(Expertise.rows[0])}
        catch (e){return res.status(505).json(e)}}
    //все экспертизы по данному делу
    async GetALL(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try{
        let Expertises=await db.query('SELECT * FROM private.expertise WHERE number_case=$1',[id])
        if (Expertises==null){res.status(200).json('не найдены')}
            return res.status(200).json(Expertises.rows)}
        catch (e){ return res.status(505).json(e)}
    }
    //получение определенной экспертизы
    async GetOne(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try{
        let Expertise=await db.query('SELECT * FROM private.expertise WHERE number_examinaton=$1',[id])
            if (Expertise==null){res.status(200).json('не найден')}
            return res.status(200).json(Expertise.rows[0])}
        catch (e){return res.status(505).json(e)}
    }
    //изменение данных экспертизы
    async Editexpertise(req,res){
        let id=req.query.id
        let {number_case,name_examination,id_worker,conclusion}=req.body
        if (!id && !req.body){return res.status(400).json('вы ничего не ввели')}
        if (id_worker!==null){await db.query('UPDATE private.expertise set id_worker=$1 WHERE number_examination=$2',[id_worker,id])}
        if (number_case!==null){await db.query('UPDATE private.expertise set number_case=$1 WHERE number_examination=$2',[number_case,id])}
        if (name_examination!==null){await db.query('UPDATE private.expertise set name=$1 WHERE number_examination=$2',[name_examination,id])}
        if (conclusion!==null){await db.query('UPDATE private.expertise set conclusion=$1 WHERE number_examination=$2',[conclusion,id])}
        let Expertise=await db.query('SELECT * FROM private.expertise WHERE number_examination=$1',[id])
        return res.status(200).json(Expertise.rows[0])
    }
    //удаление экспертизы
    async Deleteexpertise(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try{
        await db.query('DELETE  FROM private.expertise WHERE number_examination=$1',[id])
            return res.status(200).json('выполнено')}
        catch (e){return res.status(505).json(e)}}


}
module.exports=new ExpertiseController()