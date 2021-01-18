<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminAuth extends Controller
{
    public function getLoginPage(){

        // login process check
        if(!admin()->check()){

            return view('admin.register');
        }else{
            return redirect('admin');
        }

    }


     public function getUserData(){
         //get user data after login success
        if(request()->ajax()){

         if(admin()->check()){

                 $data=[
                     'name'=>admin()->user()->name,
                     'email'=>admin()->user()->email,
                     'id'=>admin()->user()->id
                    ];

                    return json_encode($data);
                }{
                    $message='Please Sign In';

                    return json_encode($message);
                }
            }
            else{
                return back();
            }
        }

    public function login(){

    if(admin()->attempt([
        'email'=>request('email'),
        'password'=>request('password')
    ])):
      return redirect('admin');
       else:
        return response()->json('Invaild Email or Password',422);

    endif;
}

    public function logout(){

    admin()->logout();
        return redirect('admin');


}
}
