import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faEye, faEyeSlash, faKey, faPhoneAlt, faUpload, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthService from './auth-service';

const Signup = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const service = new AuthService();
    const navigate = useNavigate();

    const handleUsername = e => setUsername(e.target.value);
    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);
    const handleDescription = e => setDescription(e.target.value);
    const handleIsSeller = e => {
        e.preventDefault();
        setIsSeller(!isSeller);
        setDescription('');
        setWhatsAppNumber('');
    };
    const handleWhatsAppNumber = e => setWhatsAppNumber(e.target.value);
    const handleErrorMessage = () => {
        setErrorMessage('');
    };
    const handleFileUpload = e => {
        const uploadData = new FormData();
        setFileName(e.target.files[0].name);

        uploadData.append('imageUrl', e.target.files[0]);

        service.uploadImage(uploadData)
            .then(response => setImageUrl(response.imageUrl))
            .catch(err => setErrorMessage(err.response.data.message))
    };

    const togglePassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
        const inputPass = document.getElementById('password');
        if (!showPassword) inputPass.type = 'text';
        if (showPassword) inputPass.type = 'password';
    };

    const handleFormSubmit = e => {
        e.preventDefault();

        service.signup(username, password, isSeller, description, email, whatsAppNumber, imageUrl)
            .then(response => {
                setUsername('');
                setPassword('');
                setDescription('');
                setWhatsAppNumber('');
                setImageUrl('');
                setFileName('');
                props.getUser(response);
                navigate('/');
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className='hero is-fullheight-with-navbar'>
            <div className='hero-body'>
                <form onSubmit={handleFormSubmit} className="box column is-half is-offset-one-quarter">
                    <h3 className='title'>Signup</h3>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left">
                            <input name='username' className="input" required value={username} onChange={handleUsername} type="text" placeholder="Name" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUserAlt} size='lg' />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left ">
                            <input name='email' className="input" required type="email" placeholder="youremail@example.com" value={email} onChange={handleEmail} />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faAt} size='lg' />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="field has-addons">
                            <div className="control has-icons-left is-expanded">
                                <input id='password' name='password' className="input" required value={password} onChange={handlePassword} type="password" placeholder="********" />
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

                    <div className="file is-boxed is-centered">
                        <label className="file-label">
                            <input className="file-input" onChange={e => handleFileUpload(e)} type="file" name="resume" />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <FontAwesomeIcon icon={faUpload} size='lg' />
                                </span>
                                <span className="file-label">
                                    {
                                        fileName
                                            ?
                                            `${fileName}`
                                            :
                                            'Choose a file…'
                                    }
                                </span>
                            </span>
                            <small>For a better user experience we highly recommend you to select a 1:1 format picture</small>
                        </label>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button onClick={handleIsSeller} className="button is-link">{isSeller ? "No, I just want to BUY plants" : "I want to SELL plants"}</button>
                        </div>
                    </div>

                    {isSeller &&
                        <>
                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea name='description' className="textarea" required value={description} onChange={handleDescription} placeholder="Brief Description or lema"></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">WhatsApp Number</label>
                                <div className="control has-icons-left">
                                    <input className="input" name='whatsAppNumber' required type="tel" onChange={handleWhatsAppNumber} value={whatsAppNumber} pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faPhoneAlt} size='lg' />
                                    </span>
                                    <small>Format: 777-123-45-67</small>
                                </div>
                            </div>
                        </>
                    }

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Create Account</button>
                        </div>
                        <div className="control">
                            <span>Already an User?</span>
                            <Link to={'/login'} className="button is-link is-light">Login</Link>
                        </div>
                    </div>

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

export default Signup;