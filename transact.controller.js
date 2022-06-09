const db=require('../db')
class TransactController{
     async Start(req,res){
         try {
             await db.query('begin;')
             return res.status(200).json('hkjh')
         }
         catch (e){ res.status(500).json(e)}
     }
     async Rollback(req,res){
         try {
             await db.query('rollback;')
             return res.status(200).json('hj')
         }catch (e) {res.status(500).json(e)}
     }
     async Commit(req,res){
         try {
             await db.query('commit;')
             return res.status(200).json('jo')
         }catch (e) {res.status(500).json(e)}
     }
}
module.exports=new TransactController()