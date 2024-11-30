import { Button, Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
const USER_API_END_POINT = import.meta.env.VITE_USER_API_END_POINT;
import Loader from '../../components/Loder'

const EmailVerification = () => {
    const [isVerified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    // console.log(token);

    useEffect(()=>{
        const verifyEmail = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${USER_API_END_POINT}/verify/${token}`,{});

                if(res?.data?.success){
                    setVerified(true);
                }
                else{
                    setVerified(false);
                }
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        verifyEmail();
    },[token])

    if(loading){
        return <Loader />
    }
    
  return (
    <div className="flex items-center justify-center h-[60vh] bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-md border">
            {
                isVerified ? (
                    <>
                    <Result status="success" title="Email verified successfully." 
                    extra={[
                        <Button type="primary" key="home" href="/">
                          Go to Homepage
                        </Button>,
                        <Button key="sign-in" href='/sign-in'>
                          Sign in
                        </Button>,
                      ]}/>
                    </>
                ) : <>
                    <Result status="error" title="Unable to verify your email."
                    extra={[
                        <Button type="primary" key="home" href="/">
                          Go to Homepage
                        </Button>,
                        <Button key="sign-in" href='/resend-verification-email'>
                          Resend Email
                        </Button>,
                      ]}/>
                </>
            }
        
        </div>
    </div>
  )
}

export default EmailVerification