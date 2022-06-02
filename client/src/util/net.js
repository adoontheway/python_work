
import axios from "axios"

const NetUtil = {}

const Server_Root = "http://localhost:5000/"

NetUtil.get =  (url,callback)=>{
    axios.get(Server_Root+url).then((res)=>{
        callback(res)
    })
}

NetUtil.postJson = (url, data,callback)=>{
    axios.post(Server_Root+url, data).then((res)=>{
        callback(res)
    })
}

NetUtil.postForm = (url, formData,callback)=>{
    let config = {
        method:'post',
        headers:{'Content-Type':'multipart/form-data'}
    }
    axios.post(Server_Root+url, formData,config).then(res => {
        callback(res)
    })
}


     
export default NetUtil;

