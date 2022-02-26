import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faUpload } from '@fortawesome/free-solid-svg-icons';
import PlantService from './plant-service';
import { useNavigate } from 'react-router-dom';

const CreatePlant = props => {
    const [plantName, setPlantName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [light, setLight] = useState('Sol');
    const [location, setLocation] = useState('Indoor');
    const [imageUrl, setImageUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePlantName = e => setPlantName(e.target.value);
    const handleDescription = e => setDescription(e.target.value);
    const handlePrice = e => setPrice(e.target.value);
    const handleLight = e => setLight(e.target.value);
    const handleLocation = e => setLocation(e.target.value);
    const handleErrorMessage = () => {
        setErrorMessage('');
    };

    const service = new PlantService();
    const history = useNavigate();

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
        service.createPlant(plantName, description, price, light, location, imageUrl)
            .then(response => {
                setPlantName('');
                setDescription('');
                setPrice(0);
                setLight('Sol');
                setLocation('Indoor');
                setImageUrl('');
                setFileName('');
                props.reloadData();
                history(-1);
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            });
    }

    return (
        <div className='hero is-fullheight-with-navbar'>
            <div className='hero-body'>
                <form onSubmit={handleFormSubmit} className="box column is-half is-offset-one-quarter">
                    <h3 className='title'>Create plant</h3>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Name:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="text" placeholder="Name" value={plantName} onChange={handlePlantName} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faSeedling} size='lg' />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Description:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <textarea className="textarea" maxLength={'150'} minLength={'30'} placeholder="Give a brief explanaion of the plant" value={description} onChange={handleDescription}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Location:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={location} onChange={handleLocation}>
                                            <option value='Indoor'>Indoor</option>
                                            <option value='Outdoor'>Outdoor</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Light:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={light} onChange={handleLight} >
                                            <option value='Sol'>Sol</option>
                                            <option value='Sombra'>Sombra</option>
                                            <option value='Media Sombra'>Media Sombra</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className='label'>Set a Price:</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-narrow">
                                <div className="field has-addons">
                                    <p className="control">
                                        <a className="button is-static">
                                            $
                                        </a>
                                    </p>
                                    <p className="control is-expanded">
                                        <input className="input" type="number" placeholder="Set the price" value={price} onChange={handlePrice} step="0.01" />
                                    </p>
                                </div>
                                <p className="help">Do not enter the first zero</p>
                            </div>
                        </div>
                    </div>

                    <div className="file has-name is-fullwidth">
                        <div className="field-label is-normal">
                            <label className="label">Choose A File:</label>
                        </div>
                        <div className="field-body">
                            <div className="file">
                                <label className="file-label">
                                    <input onChange={e => handleFileUpload(e)} className="file-input" type="file" name="imageUrl" />
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
                                </label>

                                <small>For a better user experience we highly recommend you to select a 1:1 format picture</small>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary">
                                        Create plant
                                    </button>
                                </div>
                            </div>
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

export default CreatePlant;