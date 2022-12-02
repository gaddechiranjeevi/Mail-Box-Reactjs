import React, {useRef,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { authActions } from "../../Store/auth";
import classes from './Login.module.css';



const LoginPage = () =>{
    const dispatch = useDispatch()
    const history = useHistory();

    const emailRef= useRef();
    const passwordOneRef =useRef();
    const passwordTwoRef = useRef();
    const [swapCheck , setSwap] = useState(false);

    const swapHandler =(event) =>{
        event.preventDefault();
        setSwap((preValue)=> !preValue);
    }



    const SignupBtnHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordOneRef.current.value;

        //Login
        if(swapCheck){
            if(passwordOneRef.current.value.trim().length > 5 && 
            emailRef.current.value.includes("@") &&
            emailRef.current.value.includes(".com")) {
                try{
                    const response =  await fetch(
                        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6Fwyxzf7XIjETnQnlS6RzhLFubagwHP0",
                        {
                          method: "POST",
                          body: JSON.stringify({
                            email: enteredEmail,
                            password: enteredPassword,
                            returnSecureToken: true,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      if(response.ok){
                        const data = await response.json();
                        localStorage.setItem('JWTTOKEN',data.idToken);
                        localStorage.setItem('userID',data.localId);
                        localStorage.setItem('Email',data.email);
                        emailRef.current.value='';
                        passwordOneRef.current.value='';
                        alert('Login sucessFull');
                        history.replace('/Welcome');
                        dispatch(authActions.setAuth(true))
                      }else{
                        const data = await response.json();
                        alert(data.error.message);
                      }
                }
                catch(err){
                    console('Loging Something went wrong!');
                }
            } else{
                alert('Login Credential Wrong!')
            }   
        } 
        //Signup
         else if(!swapCheck){

         if(passwordOneRef.current.value === passwordTwoRef.current.value &&
             passwordOneRef.current.value.trim().length > 5 &&
             emailRef.current.value.includes("@") &&
             emailRef.current.value.includes(".com")
              ){


        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6Fwyxzf7XIjETnQnlS6RzhLFubagwHP0",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
           )
           if(response.ok){
               console.log('User has successfully signed up.');
               emailRef.current.value='';
               passwordOneRef.current.value='';
               passwordTwoRef.current.value='';
               setSwap(true);
               alert('Account created, Please Login.');
           }else{
            const data = await response.json();
            alert(data.error.message);
           }
        }catch(err){
            console.log('Something went wrong')
            console.log(err);

        }
    }else{
        alert('Please enter field properly');
    }
} 
    }
    const forgotbtnHandler =(event)=>{
        event.preventDefault();
       console.log('reset...')
    }

    return(
        <div  className={classes.backgroundDiv}> 
            <div className={classes.maindivtagg}>
            <form className={classes.mainform} >
                <div>
                    <div>
                        <h1>{swapCheck? 'Login' : 'SignUp' }</h1>
                    </div>
                    <div className={classes.inputFulldiv} >
                        <div className={classes.emaildiv}>
                            <input type="email" htmlFor="email" className={classes.btnclass} placeholder="Email" ref={emailRef}  required/>
                        </div>
                        <div className={classes.emaildiv}>
                            <input type='password'  minLength="6" className={classes.btnclass} ref={passwordOneRef} maxLength="16" placeholder="Password" required/>
                        </div>
                        {!swapCheck && <div className={classes.emaildiv}>
                            <input type='password'   ref={passwordTwoRef} className={classes.btnclass} maxLength="16" placeholder="Confirm Password" minLength="6"  required/>
                        </div>}
                        <div className={classes.emaildiv}>
                            <button onClick={SignupBtnHandler} className={classes.submitbtn} >{swapCheck? 'Login' : 'SignUp'  }</button><br/>
                            {swapCheck && <label className={classes.forgotpassword} onClick={forgotbtnHandler} > Forgot password</label>}
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={swapHandler} className={classes.changebtn}>{swapCheck? "Don't have an account? Sign up" : 'Have an account? Login' }</button>
                </div>
            </form>
        </div>
        </div>
    )
};

export default LoginPage;