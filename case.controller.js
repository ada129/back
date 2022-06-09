const db=require('../db')
class CaseController{
    //заведение нового дела
    async Createcase(req,res){
        if(!req.body){res.status(404).json('вы ничего не ввели')}
        const {number_case,name,accusation}=req.body
        try{
        let Case=await db.query('INSERT INTO public.case (number_case,name,accusation) values($1,$2,$3)  RETURNING *',[number_case,name,accusation])
        res.status(200).json(Case.rows[0])}
        catch (e) {res.status(505).json(e)}}
    //вывод всех дел номеров
    async GetId(req,res){
        try {
        let Cases=await db.query('SELECT number_case,name FROM public.case')
        res.status(200).json(Cases.rows)}
        catch (e) {res.status(505).json(e)}
    }
    //содержание указанного дела
    async GetALL(req,res){
        let id=req.query.id
        if(!id){return res.status(404).json('вы ничего не ввели')}
        try{
        let Casesid=await db.query('select * from a Where number_case=$1',[id])
        if (!Casesid.rows.length){ return res.status(400).json('Дела с таким номером не существует')}
        res.status(200).json(Casesid.rows[0])}
        catch (e) {res.status(505).json(e)}
    }
    async GetONE(req,res){
        let id=req.query.id
        if(!id){res.status(404).json('вы ничего не ввели')}
        try {
            let Case=await db.query('SELECT * from public.case where number_case=$1',[id])
            if (Case == null){return res.status(400).json('Дела с таким номером не существует')}
            res.status(200).json(Case.rows[0])}
        catch (e) {res.status(505).json(e)}
    }
    //изменение деталей дела
    async Editcase(req,res){
        let id=req.params.id
        if(!id && !req.body) {res.status(404).json('вы ничего не ввели')}
        let {name,accusation}=req.body
        if (name!== null) {await db.query('UPDATE public.case set name=$1 WHERE number_case=$2 ',[name,id])}
        if (accusation!==null){await db.query('UPDATE public.case set accusation=$1 WHERE number_case=$2 ',[accusation,id])}
        let Case=await db.query('SELECT * FROM public.case WHERE  number_case=$1',[id])
        res.status(200).json(Case.rows[0])
        }
    //удаление дела
    async Deletecase(req,res){
        let id=req.query.id
        if(!id ) {res.status(404).json('вы ничего не ввели')}
        try {
        await db.query('DELETE  FROM public.case WHERE number_case=$1',[id])
        res.status(200).json('выполненно')}
        catch (e) {res.status(505).json(e)}
    }

}
module.exports=new CaseController()