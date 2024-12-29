//测试任务请求配置

//导入已经配置好的 axios
import axios from "./http";

const testtask = {
    //查看所有测试任务
    getTesttasks(){
        return axios({
            method: "GET",
            url: "/task/list"
        })
    },
    //测试任务状态的更改
    updateTaskStatus(data){
        return axios({
            method: "POST",
            url: "/task/update",
            data: data //传递的参数是body
        })
    },
    //执行测试任务
    runTesttask(data){
        return axios({
            method: "POST",
            url: "/run",
            data: data //传递的参数是body
        })
    },
    //获取allure报告
    getReport(params){
        return axios({
            method: "GET",
            url: "/report",
            params: params //传递的参数拼接URL，用params
        })
    },
}


//导出让其他文件可以使用
export default testtask