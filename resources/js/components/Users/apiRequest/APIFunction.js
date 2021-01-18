import Cookies from "universal-cookie"
import { cookies } from "./Cookes"
import { Redirect } from "react-router"
const { default: axios } = require("axios")
import React from 'react'

export const apiRequest = (url,data={},params=null,method='get')=>
{


   return  axios({
    method: method,
    url: '/api/'+url,
    data: data,
    params:params,
    headers: {
      Authorization: 'Bearer ' + cookies.get('token')
    }
  })
 }
  export const apiRequestWithFile = (url,data={},method='post')=>
  {


     return  axios({
      method: method,
      url: '/api/'+url,
      data: data,
      params:params,
      headers: {
        Authorization: 'Bearer ' + cookies.get('token'),
       'Content-Type':'formdata/multipart'
      }
    })


}
