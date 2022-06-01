
import axios from "axios"

const NetUtil = {}

NetUtil.get =  (url,callback)=>{
    axios.get(url).then((res)=>{
        callback(res)
    })
}

NetUtil.postJson = (url, data,callback)=>{
    axios.post(url, data).then((res)=>{
        callback(res)
    })
}

NetUtil.postForm = (url, formData,callback)=>{
    axios.post(url, formData).then(res => {
        callback(res)
    })
}

     
export default NetUtil;

