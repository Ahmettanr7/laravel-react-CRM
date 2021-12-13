import axios from "axios";

export default class AuthService{
    register(user){
        return axios.post("/api/auth/register",user)
    }
    login(user){
        return axios.post("/api/auth/login",user)
    }
    authenticate(token){
        return axios.post("/api/authenticate",{},{headers:{Authorization:'Bearer '+token}})
    }
    logout(token){
        return axios.post("/api/logout",{},{headers:{Authorization:'Bearer '+token}})
    }
}