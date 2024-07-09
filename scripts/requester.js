const API  = 'http://localhost:3000/'
const HEADERS = {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer `+localStorage.accessToken        
                }


async function requester(method, url, body){
  try{
     let res = axios[method.toLowerCase()](API+url, body? body : {headers : HEADERS, credentials: "include"}, { headers: HEADERS, credentials: "include" }, ).then((res)=>{
      return res.data
     })
     return res
  }catch(e){
    if(e.response?.data?.message === 'Access Token Invalid'){
      const res = await axios.get(`${API}auth/refresh`,{  
                                headers:{
                                  "Content-Type":"application/json",
                                  "Authorization":"Bearer "+localStorage.refreshToken
                                  }
                                })

      localStorage.accessToken = res.data.accessToken
      localStorage.refreshToken = res.data.refreshToken
      await requeter(method,url,body)
      return
    }else{
      console.log(e)
      return catchError(e)
    }

  }
}
