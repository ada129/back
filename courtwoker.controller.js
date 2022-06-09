const db=require('../db')
class CourtwokerController{
    //регистрация работников
    async Createcourtwoker(req,res){
        if(!req.body){res.status(404).json('вы ничего не ввели')}
        try{
        const {name,post,id_worker,name_court,qualification,number_case}=req.body
        let Courtwoker=await db.query('Begin;' +
            'INSERT INTO private.court_woker (name,post,id_worker,name_court,qualification,number_case) values ($1,$2,$3,$4,$5,$6)  RETURNING *',[name,post,id_worker,name_court,qualification,number_case])
        res.status(200).json(Courtwoker.rows[0])}
        catch (e) {req.status(505).json(e)}}
    //все работники занимающиеся данным делом
    async GetALL(req,res){
        let id=req.query.id
        if (!id){res.status(404).json('вы ничего не ввели')}
        try {
        let Courtwoker=await db.query('SELECT * FROM private.court_woker WHERE number_case=$1',[id])
        if (Courtwoker==null){res.status(200).json('никто не работает над этим делом')}
        res.status(200).json(Courtwoker.rows)}
        catch (e) {res.status(505).json(e)}
    }
    //получение данных кокретного работника
    async GetOne(req,res){
        let id=req.params.id
        if (!id){res.status(404).json('вы ничего не ввели')}
        try {
        let Courtwoker=await db.query('SELECT * FROM private.court_woker WHERE id_worker=$1',[id])
        if (Courtwoker==null){res.status(200).json('не найден')}
        res.status(200).json(Courtwoker.rows)}
        catch (e) {res.status(505).json(e)}
    }
    //изменение данных рабтника
    async Editcountwoker(req,res){
        let id=req.params.id
        if (!id && !req.body){res.status(404).json('вы ничего не ввели')}
        let {number_case,name,qualification,post}=req.body
        try{
            await db.query('begin;')
        if (qualification!==null){await db.query('UPDATE private.court_woker set qualification=$1 WHERE id_worker=$2',[qualification,id])}
        if (number_case!==null){await db.query('UPDATE private.court_woker set number_case=$1 WHERE id_worker=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.court_woker set name=$1 WHERE id_worker=$2',[name,id])}
        if (post!==null){await db.query('UPDATE private.court_woker set post=$1 WHERE id_worker=$2',[post,id])}
        let Countwoker=await db.query('SELECT * FROM private.court_woker WHERE id_worker=$1',[id])
        res.status(200).json(Countwoker.rows[0])}
        catch (e) {res.status(505).json(e)}
    }
    //удаление данных работника
    async Deletecountwoker(req,res){
        let id=req.params.id
        if (!id){res.status(404).json('вы ничего не ввели')}
        try {
        await db.query('DELETE  FROM private.court_woker WHERE id_worker=$1',[id])
        res.status(200).json('выполнено')}
        catch (e){res.status(505).json(e)}
    }

}
module.exports=new CourtwokerController()