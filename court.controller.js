const db=require('../db')
class CourtController{
    // внесение данных о суде
    async Createcourt(req,res){
        if (!req.body){res.status(404).json('вы ничего не ввели')}
        const {name_court,city,specialization_of_the_court}=req.body
        try {
        let Cuort=await db.query('INSERT INTO cuort (name_court,city,specialization_of_the_court) values ($1,$2,$3)  RETURNING *',[name_court,city,specialization_of_the_court])
        res.status(200).json(Cuort.rows[0])}
        catch (e){res.status(505).json(e)}}
    //получение информации о суде
    async GetOne(req,res){
        let id=req.params.id
        if (!id){res.status(404).json('вы ничего не ввели')}
        try{
        let Cuort=await db.query('SELECT * FROM cuort WHERE name_court=$1',[id])
        if (Cuort==null){res.status(200).json('не найден')}
        res.status(200).json(Cuort.rows[0])}
        catch (e){res.status(505).json(e)}
    }
    //удаление записей о суде
    async Deletecourt(req,res){
        let id=req.params.id
        if (!id){res.status(404).json('вы ничего не ввели')}
        try{
        await db.query('DELETE FROM cuort WHERE name_court=$1',[id])
        res.status(200).json('выполено')}
        catch (e){res.status(505).json(e)}
    }
}
module.exports=new CourtController()