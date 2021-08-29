import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CoockieService {

    get(key) {
        return cookies.get(key);
    }

    set(key, value, options) {
        cookies.set(key, value, options);
    }

    remove(key){
        cookies.remove(key)
    }

}

export default new CoockieService();