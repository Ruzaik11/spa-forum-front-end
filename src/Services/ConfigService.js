import CookieService from "./CookieService";

class ConfigService {

    static authentication() {

        const config = {
            headers: { Authorization: `Bearer ${CookieService.get('token').access_token}` },
        };

        return config;

    }

    static authenticationToken() {
        const config = `Bearer ${CookieService.get('token').access_token}`;

        return config;
    }

}

export default ConfigService;