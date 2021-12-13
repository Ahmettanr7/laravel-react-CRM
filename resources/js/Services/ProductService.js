import axios from "axios";
import { values } from "lodash";

export default class ProductService{

    getAll(token){
        const config = {
            headers:{
            //'Accept':'application/json',
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/product",config)
    }

    add(product,token){
        const config = {
            headers:{
            'Accept':'application/json',
            'content-type':'multipart/form-data',
            'Authorization':'Bearer '+token
        }
        }
        return axios.post("/api/product",product,config)
    }
    delete(id,token){
        const config = {
            headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+token
        }
        }
        return axios.delete("/api/product/"+id,config)
    }
    getById(id,token){
        const config = {
            headers:{
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/product/"+id+"/edit",config)
    }
}