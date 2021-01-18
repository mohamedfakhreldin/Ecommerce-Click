<?php
namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Users extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function login(Request $request)
    {
        $userID=User::select('*')->where('email',$request->email)->first();
    //    $userDB= User::find($userID->id);


        if( auth()->attempt([
            'email'=>ucfirst(strtolower(request('email'))),
            'password'=>request('password')
        ]))
        {


            $user = $request->user();
            $tokenRes = $user->createToken('Personal Access Token');
            $expiration = $tokenRes->token->expires_at;
            $token = $tokenRes->token;
            $token->save();

            return response()->json(['access_Token'=>$tokenRes->accessToken,'expired_in'=>$expiration]);
        }
        return auth()->attempt([
            'email'=>request('email'),
            'password'=>request('password')
        ])?1:response()->json(['errors'=>['login_failed'=>'Invaild Email or Password']],422);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function logout(Request $request)
    {
        Auth::user()->tokens->each(function($token, $key) {
            $token->delete();
        });

   //   $request->user()->token()->revoke();
       return response()->json(['message'=>'done']);
    }
}
