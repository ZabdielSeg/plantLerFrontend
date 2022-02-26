import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhoneAlt, faUpload, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AuthService from './auth-service';

const EditProfileInfo = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (props.theUser) {
            setUsername(props.theUser.username);
            setEmail(props.theUser.email);
            setDescription(props.theUser.description);
            setWhatsAppNumber(props.theUser.whatsAppNumber);
            setImageUrl(props.theUser.imageUrl);
        }
    }, [props.theUser]);
    
    const service = new AuthService();
    const navigate = useNavigate();

    const handleUsername = e => setUsername(e.target.value);
    const handleEmail = e => setEmail(e.target.value);
    const handleDescription = e => setDescription(e.target.value);
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
    }


    const handleFormSubmit = e => {
        e.preventDefault();

        service.editUserInfo(props.theUser._id, username, email, imageUrl, description, whatsAppNumber)
            .then(() => {
                setUsername('');
                setDescription('');
                setWhatsAppNumber('');
                setImageUrl('');
                setFileName('');
                props.getUser();
                navigate('../');
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className='hero box'>
            <button onClick={() => navigate("../")} className="field delete is-large" />
            <h3 className='title'>Edit Info</h3>
            <form onSubmit={handleFormSubmit} className="column">
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
                        {/* has-icons-right */}
                        <input name='email' className="input" required type="email" placeholder="youremail@example.com" value={email} onChange={handleEmail} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faAt} size='lg' />
                        </span>
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

                <div className="field">
                    <div className="control">
                        <button className="button is-link">Edit my info</button>
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
    );
};

export default EditProfileInfo;