const db=require('../db')
class LawyerController{
    //добавление адвоката по делу
    async Createlawyer(req,res){
        if (!req.body){return  res.status(404).json('вы ничего не ввели')}
        const {name,id_client,number_case,qualification,id}=req.body
        try{
        let lawyer=await db.query('INSERT INTO private.lawyer (name,id_client,number_case,qualification,id) values ($1,$2,$3,$4,$5)  RETURNING *',[name,id_client,number_case,qualification,id])
        return  res.status(200).json(lawyer.rows[0])}
        catch (e){return  res.status(505).json(e)}}
    //вывод всех адвокатов по делу
    async GetALL(req,res){
        let id=req.query.id
        if (!id){return  res.status(404).json('вы ничего не ввели')}
        try{
        let lawyers=await db.query('SELECT name FROM private.lawyer WHERE number_case=$1',[id])
        if (lawyers==null){return  res.status(400).json('не найден')}
        return  res.status(200).json(lawyers.rows)}
        catch (e){return  res.status(505).json(e)}
    }
    //вывод определенного адвоката
    async GetOne(req,res){
           let id=req.query.id
           if (!id){return  res.status(404).json('вы ничего не ввели')}
           try{
           let lawyer=await db.query('SELECT name,number_case FROM private.lawyer WHERE id_client=$1 and number_case=$2',[id])
               if (lawyer==null){return  res.status(400).json('не найден')}
               return res.status(200).json(lawyer.rows)}
           catch (e){ return res.status(505).json(e)}
}
    //изменение данных адвоката
    async Editelawyer(req,res){
        let id=req.query.id
        let {number_case,name,qualification}=req.body
        if (!id && !req.body){return res.status(404).json('вы ничего не ввели')}
        if (number_case!==null){await db.query('UPDATE private.lawyer set number_case=$1 WHERE id_client=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.lawyer set name=$1 WHERE id_client=$2',[name,id])}
        if (qualification!==null){await db.query('UPDATE private.lawyer set name=$1 WHERE id_client=$2',[qualification,id])}
        let Jurry=await db.query('SELECT * FROM private.lawyer WHERE id_client=$1',[id])
        return res.status(200).json(Jurry.rows[0])
    }
    //удаление адвоката
    async Deletelawyer(req,res){
        let id=req.query.id
        if (!id){return res.status(404).json('вы ничего не ввели')}
        try{
        await db.query('DELETE  FROM private.lawyer WHERE id_client=$1',[id])
        res.status(200).json('выполено')}
        catch (e){return res.status(505).json(e)}
    }
}
module.exports=new LawyerController()