const { apiRequest } = require("./APIFunction")
import { cookies } from "./Cookes"
import { Redirect } from "react-router"
import { catchingErrors } from "./catch"
class Auth {
    login(data) {
 return       axios.post('/api/login', data).then(res => {
            let response=res.data

            cookies.set('token', response.access_Token, { path: '/',expires:new Date(Date.now()+(1000*60*60*24)) })

            apiRequest('user').then(res => {
                localStorage.setItem('id', res.data.id)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('email', res.data.email);
                window.history.back()

            })

        })

    }


    logout() {
        apiRequest('logout').then(res=>{
            if(res.data.message=='done'){
                localStorage.clear()
                cookies.remove('token',{
                    path:'/'
                })
                window.location.pathname='/'


            }
        }).catch(errors=>catchingErrors(errors))

    }
    register(data){
       return apiRequest('user/signup', data,null,'post').then(res=>{

                window.location.pathname='/login'



        })
    }

};
export const auth=new Auth();
