import "./login.css";

import { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    // update page title
    const baseName = useSelector(state => state.basePageName);
    useEffect(() => {
        document.title = baseName + "Login";
    }, [baseName]);

    const userNameInput = useRef(null);
    const passInput = useRef(null);
    const [loginError, setLoginError] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();

    const logInAttempt = e => {
        let userName = userNameInput.current.value;
        let pass = passInput.current.value;

        fetch("https://destinos.develotion.com/login.php", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                },
            "body": JSON.stringify({
                "usuario": userName,
                "password": pass
                })
            })
            .then(responseOne => responseOne.json())
                .then(responseTwo => {
                    logInSuccess(responseTwo);
                })
            .catch(err => {
                logInError(err);
            });
    }

    const logInSuccess = (responseTwo) => {
        console.log(responseTwo);
        dispatch({ type: "LOG_IN", payload: {apiKey: responseTwo.apiKey, id: responseTwo.id} });
        history.push("/dashboard");
    }

    const logInError = responseError => {
        // TODO more detailed error messages
        console.log(responseError);
        setLoginError(true);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 login-section-wrapper">
                    <div className="login-wrapper my-auto">
                        <h1 className="login-title">Log in</h1>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control" placeholder="email@example.com" ref={userNameInput}/>
                        </div>
                        
                        <div className="form-group mb-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="enter your passsword" ref={passInput}/>
                        </div>

                        <input name="login" id="login" className="btn btn-block login-btn" type="button" value="Login" onClick={logInAttempt} />

                        {loginError && <p className="login-wrapper-footer-text-error">Username or password incorrect.</p>}

                        <p className="login-wrapper-footer-text">Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </div>

            </div>    
        </div>
    )
}

export default Login

/*
import bg from './bg.jpg';
<div className="col-sm-6 px-0 d-none d-sm-block">
    <img className="bg-img" src={bg} alt="Background" />
</div>
*/