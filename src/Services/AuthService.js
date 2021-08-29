import axios from 'axios';
import CookieService from './CookieService';
import URLService from './URLService';

class AuthService {

    async login(credentials) {

        try {

            const response = await axios.post(URLService.loginURL(), credentials);

            return response.data;

        } catch (error) {
            alert('please check you\'re credentials');
        }

    }

    async register(data) {

        try {

            const response = await axios.post(URLService.registerURL(), data);

            return response.data;

        } catch (error) {
            alert("please check the inputs");
        }
    }

    async logout() {
        try {
            //const response = await axios.post(URLService.logoutURL(), ConfigService.authentication());
            CookieService.remove('user');
            CookieService.remove('token');
            CookieService.remove('roles');

            return true;

        } catch (error) {
            console.log(error);
        }
    }

    handleLoginSuccess(response) {
        const { data } = response;

        CookieService.set('user', data.user, data.token.expires_in);
        CookieService.set('token', data.token, data.token.expires_in);
        CookieService.set('roles', data.roles, data.token.expires_in);
        return true;
    }

    getUser() {
        return CookieService.get('user');
    }

    getRoles() {
        return CookieService.get('roles');
    }

    isAdmin(){

        var array  = this.getRoles();
        
        var response = false;

        array.forEach(element => {
            
            if(element.code=="admin"){
               response = true;
            }
        });
        return response;
    }

    authenticated() {

        if (CookieService.get('token')) {
            return true;
        } else {
            return false;
        }
    }

}

export default new AuthService();