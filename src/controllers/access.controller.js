class AcesssController{
    signUp = async(req,res,next)=>{
        try {
            console.log(`[P]:: signUp::`,req.body)
            return res.status(201).json({
                code:'20001',
                metadata:{userid:1}
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports=new AcesssController()