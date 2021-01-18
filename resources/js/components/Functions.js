import React, { Component } from 'react'
import { CategoriesFormData } from './FormData'

export const SendUpdateStatus=(table,id)=>{
    axios.post('/admin/table/'+table+'/updatestatus/'+id)
}
