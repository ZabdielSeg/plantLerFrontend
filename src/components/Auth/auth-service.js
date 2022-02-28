import axios from "axios";

class AuthService {
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

    getProfile = id => {
        return this.service.get(`/profile/${id}`)
            .then(response => response.data);
    }

    signup = (username, password, isSeller, description, email, whatsAppNumber, imageUrl) => {
        return this.service.post('/signup', { username, password, isSeller, description, email, whatsAppNumber, imageUrl })
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data);
    };

    login = (email, password) => {
        return this.service.post('/login', { email, password })
            .then(response => response.data);
    };

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data);
    };

    getAllSellers = () => {
        return this.service.get('/all-sellers')
            .then(response => response.data);
    };

    editUserInfo = (id, username, email, imageUrl, description, whatsAppNumber) => {
        return this.service.put(`/edit-user-info/${id}`, {username, email, imageUrl, description, whatsAppNumber})
            .then(response => response.data);
    };
}

export default AuthService;