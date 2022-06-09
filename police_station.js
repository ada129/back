const db=require('../db')
class Police_station{
    //создание участка
    async Createpolice_station(req,res){
        if (!id){return  res.status(404).json('вы ничего не ввели')}
        const {name_police_station,code_division,city}=req.body
        try{
        let Police_station=await db.query('INSERT INTO police_station (name_police_station,code_division,city) values ($1,$2,$3)  RETURNING *',[name_police_station,code_division,city])
        return  res.status(200).json(Police_station.rows[0])}
        catch (e){return  res.status(505).json(e)}}
    //вывод участка куриркующего дело
    async GetOne(req,res){
        let id=req.query.id
        if (!id){return  res.status(404).json('вы ничего не ввели')}
        try {
        let Police_station=await db.query('SELECT * police_station FROM  WHERE code_division=$1',[id])
        if (Police_station==null){return  res.status(200).json('не найден')}
        res.status(200).json(Police_station.rows[0])}
        catch (e){return  res.status(505).json(e)}
    }
    //удаление определенного участка
    async Deletepolice_station(req,res){
        let id=req.query.id
        if (!id){return  res.status(404).json('вы ничего не ввели')}
        try{
        await db.query('DELETE  FROM police_station WHERE code_division=$1 RETURNING *',[id])
        return  res.status(200).json('выполнено')}
        catch (e){ return res.status(505).json(e)}
    }
}
module.exports=new Police_station()