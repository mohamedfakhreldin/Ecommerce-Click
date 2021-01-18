<?php

namespace App\Http\Controllers\ApiControllers;

use App\User;
use App\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;

use Illuminate\Support\Facades\Hash ;
class ProfileApiController extends Controller
{



    /**
     * index
     *
     * @param  mixed $branch
     * @return $branch Data
     */
    public function index($branch)
    {
        if ($branch=='account') {
            $userID= request('userid');
            return response()->json(User::find($userID));
        } elseif ($branch=='orders') {
        }
    }
    /**
     * getStoreProducts
     *
     * @param Illuminate\Http\Request $request
     * @return array products of store;
     */
    public function getStoreProducts(Request $request){
        $store=Store::where('user_id',$request->user()->id)->first();
        $storeID=$store->id;
        $storeProducts=Product::with(['category','trademark','offers'])->where('store_id',$storeID)->get();
        return response()->json($storeProducts);
    }

    /**
     * checkStore
     * check if store is avaible
     * @return bool|string
     */
    public function checkStore()
    {
        $store =Store::where('user_id', request('user_id'))->first();
        if ($store) {
            if ($store->status===0) {
                return response()->json('Waiting for Confirmation');
            }
            return response()->json($store->id);
        }
        return response()->json(false);
    }

    /**
     * updateAccount
     *
     * @param  Request $request
     * @param  mixed $id
     * @return void
     */
    public function updateAccount(Request $request, $id)
    {
        $user=User::find($id);
        if (request('email')) :
        $data=$this->validate(request(), [
            'email'=>'required|email|unique:users'
        ]);
        $data['email']= ucfirst(strtolower($data['email']));
        return $user->update($data)? getSuccessMessages('update', 'Email'):$user->update($data); elseif (request('name')):
            $data=$this->validate(request(), [
                'name'=>'required|string|min:3'
            ]);
        return $user->update($data)? getSuccessMessages('update', 'Name'):$user->update($data); elseif (request('password')):
            if(Hash::check(request('current_password'),$request->user()->password)){
                $data=$this->validate(request(), [
                    'password'=>'required|confirmed|min:6'
                ]);
                $data['password']=bcrypt(request('password'));
            return $user->update($data)? getSuccessMessages('update', 'Password'):$user->update($data);
            }

        endif;
    }
}
