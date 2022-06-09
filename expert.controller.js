const db=require('../db')
class ExpertController{
    //учетные данные работника экспертизы
    async Createexert(req,res){
        if (!req.body){return res.status(400).json('Вы нечего не ввели')}
        const {name,id_worker,place_of_work,city,qualification}=req.body
        try {
        let Expert=await db.query('INSERT INTO expert (name,id_worker,place_of_work,city,qualification) values ($1,$2,$3,$4,$5)  RETURNING *',[name,id_worker,place_of_work,city,qualification])
            return res.status(200).json(Expert.rows[0])}
        catch (e) {return res.status(505).json(e)}}
    //получение личных данных определнного старудника
    async GetOne(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('Вы нечего не ввели')}
        try {
            let Expert = await db.query('SELECT * FROM expert WHERE id_worker=$1',[id])
             if (Expert==null){res.status(200).json('сотрудник не найден')}
            return res.status(200).json(Expert.rows)}
        catch (e) {return res.status(505).json(e)}
    }
    //удаление даннх сотрудника
    async Deleteexpert(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('Вы нечего не ввели')}
        try{
        await db.query('DELETE  FROM expert WHERE id_worker=$1',[id])
            return res.status(200).json('выполненно')}
        catch (e) {return res.status(505).json(e)}
    }
    //измение данных сотрудника
    async EditExpert(req,res) {
        let id = req.query.id
        if (!id && !req.body) {
            return res.status(400).json('Вы нечего не ввели')
        }
        let {city, qualification} = req.body
        try {
            if (city !== null) {
                await db.query('UPDATE expert set city=$1 WHERE id_worker=$2 RETURNING *', [city, id])
            }
            if (qualification !== null) {
                await db.query('UPDATE expert set qualification=$1 WHERE id_worker=$2 RETURNING *', [qualification, id])
            }
            let Expert = await db.query('SELECT * FROM expert WHERE id_worker=$1', [id])
            return res.status(200).json(Expert.rows[0])
        } catch (e) {
            return res.status(505).json(e)
        }
    }
}
module.exports=new ExpertController()