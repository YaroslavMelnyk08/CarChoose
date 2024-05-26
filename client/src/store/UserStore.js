import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._user = {};
        this._userId = null;

        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setUserId(userId) {
        this._userId = userId;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get userId() {
        return this._userId;
    }
}
