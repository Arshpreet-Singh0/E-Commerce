import React, { useState } from "react";
import { Button, Card, Input , message} from "antd";
import axios from "axios";
const USER_API_END_POINT = import.meta.env.VITE_USER_API_END_POINT;

const ResendVerificationEmail = () => {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);

    const handleResendButtonClick = async()=>{
        if(!email || email.trim() === "" | !email.includes("@")){
            message.error("Please enter valid email address");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/resend-email`, {email});

            if(res?.data?.success){
                message.success(res?.data?.message);
            }
        } catch (error) {
            // console.log(error);
            message.error(error?.response?.data?.message)
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="flex items-center justify-center h-[60vh] bg-gray-100">
        <Card title="Resend verification Email" className="w-[500px] p-5 text-center">
            <div className="mb-10">

            <Input placeholder="Email" className="rounded-md" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <Button type="primary" className="w-full" onClick={handleResendButtonClick} loading={loading}>Resend</Button>
        </Card>
    </div>
  );
};

export default ResendVerificationEmail;
