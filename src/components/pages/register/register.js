import "../login/login.css";
import "./register.css";

import { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
    
    // update page title
    const baseName = useSelector(state => state.basePageName);
    useEffect(() => {
        document.title = baseName + "Register";
     }, [baseName]);

    const userNameInput = useRef(null);
    const passInput = useRef(null);
    const passInputRepeat = useRef(null);
    const [registerError, setRegisterError] = useState(false);
    const [passMismatchError, setPassMismatchError] = useState(false);

    let history = useHistory();
    const dispatch = useDispatch();

    const registerAttempt = e => {
        let userName = userNameInput.current.value;
        let pass = passInput.current.value;
        let passRepeat = passInputRepeat.current.value;

        if(pass !== passRepeat){
            setPassMismatchError(true);
        }else{
            setPassMismatchError(false);
            fetch("https://destinos.develotion.com/usuarios.php", {
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
                        registerSuccess(responseTwo);
                    })
                .catch(err => {
                    registerError(err);
                });
        }

        const registerSuccess = (responseTwo) => {
            console.log(responseTwo);
            dispatch({ type: "REGISTER", payload: {apiKey: responseTwo.apiKey, id: responseTwo.id} });
            history.push("/dashboard");
        }
    
        const registerError = responseError => {
            // TODO more detailed error messages
            console.log(responseError);
            setRegisterError(true);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 login-section-wrapper">
                    <div className="login-wrapper my-auto">
                        <h1 className="login-title">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control" placeholder="email@example.com" ref={userNameInput}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="enter your passsword" ref={passInput}/>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="password">Repeat password</label>
                            <input type="password" name="password" className="form-control" placeholder="repeat your passsword" ref={passInputRepeat}/>
                        </div>
                        {passMismatchError && <p className="login-wrapper-footer-text-error">Password and Repeat password don't match.</p>}

                        <input name="register" className="btn btn-block login-btn" type="button" value="Register" onClick={registerAttempt} />

                        {registerError && <p className="login-wrapper-footer-text-error">Username or password incorrect.</p>}

                        <p className="login-wrapper-footer-text">Already have an account? <Link to="/">Login here</Link></p>
                    </div>
                </div>

            </div>    
        </div>
    )
}

export default Register