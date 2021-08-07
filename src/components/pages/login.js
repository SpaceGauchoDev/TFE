import "./login.css";
const Login = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 login-section-wrapper">
                    <div className="login-wrapper my-auto">
                        <h1 className="login-title">Log in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="email@example.com" />
                        </div>
                        
                        <div className="form-group mb-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="enter your passsword"/>
                        </div>
                        
                        <input name="login" id="login" className="btn btn-block login-btn" type="button" value="Login" />
                        <p className="login-wrapper-footer-text">Don't have an account? <a href="#!" className="text-reset">Register here</a></p>
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