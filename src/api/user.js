import axios from "./http";

const user = {
    login(data){
        return axios({
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // },  
            method: 'POST',
            url: '/auth/login',
            data: data
        })
    },
    register(data){
        return axios({
            
            method: 'POST',
            url: '/auth/register',
            data: data
        })
    }
}

export default user