import { faSeedling, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantService from './plant-service';

const EditPlant = props => {
    const [plant, setPlant] = useState({});
    const [fileName, setFileName] = useState('');
    const { plantId } = useParams();
    
    useEffect(() => {
        getPlant();
    }, [plantId]);

    const history = useNavigate();
    const servicePlant = new PlantService();

    const getPlant = () => {
        servicePlant.getSinglePlant(plantId)
            .then(response => {
                setPlant(response);
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setPlant(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileUpload = e => {
        const uploadData = new FormData();
        setFileName(e.target.files[0].name);

        uploadData.append('imageUrl', e.target.files[0]);

        servicePlant.uploadImage(uploadData)
            .then(response => setPlant(prevState => ({
                ...prevState,
                ['imageUrl']: response.imageUrl
            })));
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        servicePlant.editPlant(plantId, plant.plantName, plant.description, plant.price, plant.light, plant.location, plant.imageUrl)
            .then(response => {
                props.reloadData();
                history(-1, { replace: true });
                setPlant({});
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                // setErrorMessage(errorDescription);
            });
    }
    
    return (
        <div className='hero'>
            <form onSubmit={handleFormSubmit} className="box column">
                <button onClick={() => history("../")} className="field is-horizontal delete is-large" />
                <h3 className='title'>Edit {plant.plantName} Info</h3>
                <div className="field">
                    <label className="label">Name:</label>
                    <div className="control is-expanded has-icons-left">
                        <input name='plantName' className="input" type="text" placeholder="Name" value={plant.plantName} onChange={handleChange} />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faSeedling} size='lg' />
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description:</label>
                    <div className="control">
                        <textarea name='description' className="textarea" maxLength={'150'} minLength={'30'} placeholder="Give a brief explanaion of the plant" value={plant.description} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="field ">
                    <label className="label">Location:</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select name='location' value={plant.location} onChange={handleChange}>
                                <option value='Indoor'>Indoor</option>
                                <option value='Outdoor'>Outdoor</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field ">
                    <label className="label">Light:</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select name='light' value={plant.light} onChange={handleChange} >
                                <option value='Sol'>Sol</option>
                                <option value='Sombra'>Sombra</option>
                                <option value='Media Sombra'>Media Sombra</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field ">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <div className="field is-expanded">
                            <div className="field has-addons">
                                <p className="control">
                                    <a className="button is-static">
                                        $
                                    </a>
                                </p>
                                <p className="control is-expanded">
                                    <input name='price' className="input" type="number" placeholder="Set the price" value={plant.price} onChange={handleChange} step="0.01" />
                                </p>
                            </div>
                            <p className="help">Do not enter the first zero</p>
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

                <div className="field ">
                    <div className="control">
                        <button className="button is-primary is-medium">
                            Edit Plant
                        </button>
                    </div>
                </div>

                {/* {errorMessage &&
                        <div className="notification is-danger is-light">
                            <p onClick={handleErrorMessage} className="delete"></p>
                            {errorMessage}
                        </div>
                    } */}
            </form>
        </div>
    );
};

export default EditPlant;