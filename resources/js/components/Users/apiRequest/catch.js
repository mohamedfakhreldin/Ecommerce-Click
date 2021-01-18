import { cookies } from "./Cookes";

export const catchingErrors=(errors)=>{
if(errors.response.status===401){
  cookies.get('token')?cookies.remove('token'):null
    window.location ='/login'
}else if(errors.response.status===422){
    window.scroll(0,10);
    return errors.response.data.errors
}else if(errors.response.status===404){
  window.location ='/notfound'
}
};
