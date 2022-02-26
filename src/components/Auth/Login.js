import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from './auth-service';
import { faAt, faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const service = new AuthService();
    const navigate = useNavigate();

    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);
    const handleErrorMessage = () => {
        setErrorMessage('');
    };

    const handleFormSubmit = e => {
        e.preventDefault();

        service.login(email, password)
            .then(response => {
                setEmail('');
                setPassword('');
                setErrorMessage('');
                props.getUser(response);
                navigate(-1);
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const togglePassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
        const inputPass = document.getElementById('password');
        if (!showPassword) inputPass.type = 'text';
        if (showPassword) inputPass.type = 'password';
    };

    return (
        <div className='hero is-fullheight-with-navbar'>
            <div className='hero-body'>
                <form onSubmit={handleFormSubmit} className="box column is-half is-offset-one-quarter">
                    <h3 className='title'>Login</h3>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                            <input name="email" className="input" type="email" placeholder="e.g. alex@example.com" value={email} onChange={handleEmail} required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faAt} size='lg' />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="field has-addons">
                            <div className="control has-icons-left is-expanded">
                                <input id="password" name="password" className="input" type="password" placeholder="********" value={password} onChange={handlePassword} required />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faKey} size='lg' />
                                </span>
                            </div>
                            <div className="control">
                                <p className="button is-info">
                                    <span className='icon is-small'>
                                        {showPassword
                                            ?
                                            <FontAwesomeIcon onClick={togglePassword} icon={faEye} />
                                            :
                                            <FontAwesomeIcon onClick={togglePassword} icon={faEyeSlash} />
                                        }
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="button is-primary">Log in</button>

                    {errorMessage &&
                        <div className="notification is-danger is-light">
                            <p onClick={handleErrorMessage} className="delete"></p>
                            {errorMessage}
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default Login;