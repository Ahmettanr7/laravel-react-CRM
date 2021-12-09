import axios from "axios";

export default class AuthService{
    register(user){
        return axios.post("/api/auth/register",user)
    }
}