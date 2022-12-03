import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './PasswordReset.module.css'

const PasswordReset = () => {
    const [isLoading,setLoading] = useState(false);
    const emailRef = useRef();
    const history = useHistory();

    const resetButtonhandler= async(event) => {
        event.preventDefault();
        const enteredEmail=emailRef.current.value;

        setLoading(true);
        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD6Fwyxzf7XIjETnQnlS6RzhLFubagwHP0",
                {
                  method: "POST",
                  body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: enteredEmail,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
           )
           if(response.ok){
            const data = await response.json();
            console.log(data);
            alert(`Link successfully send to ${enteredEmail}`)
            history.replace('/auth');
            
           }
           else{
            const data = await response.json();
            alert(data.error.message);
           }
           setLoading(false);
        }catch(err){
            console.log('Something went wrong')
            console.log(err);
            setLoading(false);
        }
   }
    const gotoHandler =(event) => {
        event.preventDefault();
        history.replace("/auth");
    }

    return(
        <div className='MainDiv' >
            <div className='subDiv'>
            <form className='MainForm'>
                <div className='Mainh1'>
                    <h1>Reset Password</h1>
                </div>
                <div className='Mainh1'>
                    <label className='Mainlabel'>Enter the email with you have registered.</label>
                </div >
                <div className='inputfielddiv'>
                    <input  className='inputfield' type='email' placeholder='Email' ref={emailRef} />
                </div>
                <div>
                    <button className='Mainbtn' onClick={resetButtonhandler} > {isLoading? 'Sending...' : 'Send Link'}</button>
                </div>
                <div className='downlabeldiv' >
                    <label className='downlabel' >Know your Password?<span className='downspan' onClick={gotoHandler} >Login </span> </label>
                </div>
            </form>
            </div>
        </div>
    )
}

export default PasswordReset;