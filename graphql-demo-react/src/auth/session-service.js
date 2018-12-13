const TOKEN_LS_ITEM = 'token';

class SessionService {

    _token = null;

    constructor() {
        this._token = localStorage.getItem(TOKEN_LS_ITEM);
    }

    setToken(token) {
        this._token = token;
        localStorage.setItem(TOKEN_LS_ITEM, token);
    }

    resetToken() {
        this._token = null;
        localStorage.removeItem(TOKEN_LS_ITEM);
    }

    getToken() {
        return this._token;
    }

    isAuthorized() {
        return !!this._token;
    }
}

export default new SessionService();