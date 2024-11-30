import User from "../models/user.model.js";

export const isAdmin = async(req,res,next)=>{
    try {
        const id = req.id;

        const user = await User.findById(id);
        

        if(!user) return res.status(404).jaon({
            message : 'Account does not exist',
            success : false,
        })

        if(!user.role && user.role!=="admin" && user.role!='superadmin'){
            return res.status(401).json({
                message : 'You dont have permission to access this route',
                success : false,
            })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
          });
    }
}