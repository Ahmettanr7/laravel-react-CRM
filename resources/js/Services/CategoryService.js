import axios from "axios";

export default class CategoryService{

    getAll(token){
        const config = {
            headers:{
            //'Accept':'application/json',
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/category",config)
    }

    getById(id,token){
        const config = {
            headers:{
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/category/"+id+"/edit",config)
    }

    getCategories(token){
        const config = {
            headers:{
            'Authorization':'Bearer '+token
        }
        }
        return axios.get("/api/category/create",config)
    }

    add(category,token){
        const config = {
            headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+token
        }
        }
        return axios.post("/api/category",category,config)
    }
    delete(id,token){
        const config = {
            headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+token
        }
        }
        return axios.delete("/api/category/"+id,config)
    }

    update(id,category,token){
        const config = {
            headers:{
                'Accept':'application/json',
                'content-type':'multipart/form-data',
                'Authorization':'Bearer '+ token
            }
        }
        return axios.post("/api/category/"+id,category,config)
    }
}