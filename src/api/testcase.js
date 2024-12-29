import axios from './http'

const testcase = {
    getTestcases(params){
        return axios({
            method:"GET",
            url: "/case/list",
            params:params
        })
    },

    addTestCase(data){
        return axios({
            method:"POST",
            url: "/case",
            data:data
        })
    },

    deletecase(data){
        return axios({
            method: "POST",
            url: "/case/delete",
            data: data //传递的参数是body
        
        })
    },

    updateTestcase(data){
        return axios({
            method: "POST",
            url: "/case/update",
            data: data //传递的参数是body
        
        })
    },
    createTask(data){
        return axios({
            method: "POST",
            url: "/task",
            data: data //传递的参数是body
        
        })
    },

}

export default testcase