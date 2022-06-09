const db=require('../db')
class WitnessController{
    //добавление свидетеля по делу
    async Createwitnes(req,res) {
        if (!req.body) {
            return res.status(400).json('вы ничего не ввели')
        }
        const {name, id, number_case, indication} = req.body
        try {
            let witness = await db.query('INSERT INTO private.witness (name,id,number_case,indication) values ($1,$2,$3,$4)  RETURNING *', [name, id, number_case, indication])
            return res.status(200).json(witness.rows[0])
        } catch (e) {
            return res.status(505).json(e)
        }
    }
    //все свидетели по указанному делу
    async GetALL(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try{
        let witnesses=await db.query('SELECT name,indication FROM private.witness WHERE number_case=$1',[id])
        if (witnesses==null){return res.status(200).json('свидетели по делу отсутвуют')}
            return res.status(200).json(witnesses.rows)}
        catch (e) {return res.status(505).json(e)}
    }
    async GetOne(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try{
        let witness=await db.query('SELECT name,indication FROM private.witness WHERE id=$1',[id])
        if (witness==null){return res.status(200).json('свидетель не найден')}
            return res.status(200).json(witness.rows)}
        catch (e) {return res.status(505).json(e)}
    }
    //изменение данных свидетеля
    async Editewitness(req,res){
        let id=req.query.id
        if (!id && !req.body){return res.status(400).json('вы ничего не ввели')}
        let {number_case,name,indication}=req.body
        try{
        if (number_case!==null){await db.query('UPDATE private.witness set number_case=$1 WHERE id=$2',[number_case,id])}
        if (name!==null){await db.query('UPDATE private.witness set name=$1 WHERE id=$2',[name,id])}
        if (indication!==null){await db.query('UPDATE private.witness set name=$1 WHERE id=$2',[indication,id])}
        let witness=await db.query('SELECT * FROM private.witness WHERE id=$1',[id])
            return res.status(200).json(witness.rows[0])}
        catch (e) {return res.status(505).json(e)}
    }
    //удаление обвиняемого
    async Deletewitness(req,res){
        let id=req.query.id
        if (!id){return res.status(400).json('вы ничего не ввели')}
        try{
        await db.query('DELETE  FROM private.witness WHERE id=$1',[id])
            return res.status(200).json('выполнено')}
        catch (e){return res.status(505).json(e)}
    }
}
module.exports=new WitnessController()