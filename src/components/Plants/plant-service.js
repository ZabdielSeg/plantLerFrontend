import axios from "axios";

class PlantService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        });
        this.service = service;
    }

    uploadImage = imageUrl => {
        return this.service.post('/upload-image', imageUrl)
            .then(response => response.data)
    }

    createPlant = ( plantName, description, price, light, location, imageUrl ) => {
        return this.service.post('/create-plant', { plantName, description, price, light, location, imageUrl })
            .then(response => response.data)
    }

    editPlant = (id, plantName, description, price, light, location, imageUrl) => {
        return this.service.put(`/edit-plant/${id}`, {plantName, description, price, light, location, imageUrl})
            .then(response => response.data)
    };

    deletePlant = id => {
        return this.service.delete(`/delete-plant/${id}`)
            .then(response => response.data);
    };

    getAllPlants = () => {
        return this.service.get('/all-plants')
            .then(response => response.data);
    };

    getSinglePlant = id => {
        return  this.service.get(`/plant/${id}`)
            .then(response => response.data);
    }
}

export default PlantService;