const db=require('../db')
class Police_officerController{
    //добавление работника по делу
    async Createpolice_off(req,res){
        if (!req.body){return res.status(404).json('вы ничего не ввели')}
        const {name,post,id_worker,code_division,title,number_case}=req.body
        try{
        let Police_off=await db.query('INSERT INTO private.police_officer (name,post,id_worker,code_division,title,number_case) values ($1,$2,$3,$4,$5,$6)  RETURNING *',[name,post,id_worker,code_division,title,number_case])
            return res.status(200).json(Police_off.rows[0])}
        catch (e){ return res.status(505).json(e)}}
    //вывод всех работников занятых делом
    async GetALL(req,res){
        let id=req.query.id
        if (!id){return res.status(404).json('вы ничего не ввели')}
        try{
        let Police_offs=await db.query('SELECT * FROM private.police_officer WHERE number_case=$1',[id])
        if (Police_offs==null){return res.status(200).json('не найден')}
            return res.status(200).json(Police_offs.rows)}
        catch (e){return res.status(505).json(e)}
    }
    //поиск определенного работника
    async GetOne(req,res){
        let id=req.query.id
        if (!id){return res.status(404).json('вы ничего не ввели')}
        try{
        let Police_off=await db.query('SELECT * FROM private.police_officer WHERE id_worker=$1',[id])
            if (Police_off==null){return res.status(200).json('не найден')}
            return res.status(200).json(Police_off.rows[0])}
        catch (e){return res.status(505).json(e)}
    }
    //изменение данных работника
    async Editpolice_off(req,res){
        let id=req.query.id
        if (!id && !req.body){return res.status(404).json('вы ничего не ввели')}
        let {number_case,name,title,post}=req.body
        if (title!==null){await db.query('UPDATE private.police_officer set title=$1 WHERE id_worker=$2',[title,id])}
        if (number_case!==null){await db.query('UPDATE private.police_officer set number_case=$1 WHERE id_worker=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.police_officer set name=$1 WHERE id_worker=$2',[name,id])}
        if (post!==null){await db.query('UPDATE private.police_officer set post=$1 WHERE id_worker=$2',[post,id])}
        let Police_off=await db.query('SELECT * FROM private.police_officer WHERE id_worker=$1',[id])
        return  res.status(200).json(Police_off.rows[0])
    }
    //отстранение работника
    async Deletecountwoker(req,res){
        if (!id){return res.status(404).json('вы ничего не ввели')}
        let id=req.query.id
        try{
        await db.query('DELETE  FROM private.police_officer WHERE id_worker=$1',[id])
            return res.status(200).json('выполнено')}
        catch (e){ return res.status(505).json(e)}
    }

}
module.exports=new Police_officerController()