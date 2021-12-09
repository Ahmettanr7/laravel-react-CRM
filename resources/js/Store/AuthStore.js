import { observable, action, makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import sign, { Sign } from "jwt-encode";
class AuthStore{
    appState = null;

    constructor(){
        makeAutoObservable(this,{
            appState:observable,
            saveToken:action,
            getToken:action
        });
    }

    saveToken = (appState) => {
        try {
            localStorage.setItem('appState',CryptoJS.AES.encrypt(sign(appState,"secret"),"superSecretSession"))
            this.getToken();
        } catch (e) {
            console.log(e);
        }
    }

    getToken = () => {
        try {
            const appStateData = localStorage.getItem('appState');
            if (appStateData) {
                var bytes = CryptoJS.AES.decrypt(appStateData,'superSecretSession');
                var orginalText = bytes.toString(CryptoJS.enc.Utf8);
                 this.appState = jwtDecode(orginalText);
            }else{
                this.appState = null;
            }
           
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthStore();
