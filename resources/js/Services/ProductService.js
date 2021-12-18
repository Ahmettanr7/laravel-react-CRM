import axios from "axios";

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

    getById(id,token){
        const config = {
            headers:{
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/product/"+id+"/edit",config)
    }

    getCategories(token){
        const config = {
            headers:{
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/product/create",config)
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

    update(id,product,token){
        const config = {
            headers:{
                'Accept':'application/json',
                'content-type':'multipart/form-data',
                'Authorization':'Bearer '+ token
            }
        }
        return axios.post("/api/product/"+id,product,config)
    }
}