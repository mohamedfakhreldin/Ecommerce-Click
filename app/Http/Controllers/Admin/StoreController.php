<?php

namespace App\Http\Controllers\Admin;

use Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StoreController extends Controller
{
    private $tableName = 'Store';
    private $model = "App\Store";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->ajax()) {
            return $this->model::select(
                'stores.id as ID',
                'store_name as Store Name',
                'name as Owner Name',
                'location as Location',
                'status',
                'phone_number as Phone Number',
                'stores.created_at as Created At',
                'stores.updated_at as Updated At'
            )->leftJoin('users', 'user_id', '=', 'users.id')->get();
        } else {
            return view('admin.home');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.home');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $data = $this->validate(request(), [
            'store_name' => "required|min:3|unique:stores",
            'location' => "required|url",
            'phone_number' => 'required|numeric|min:11'
        ]);
        $data['user_id'] = admin()->id()?8:$request->user()->id;

         if($this->model::create($data)){


                return getSuccessMessages('create',$this->tableName);
            } else {
            return 'error';
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
    public function updateStoreStatus($id)
    {
        $store= $this->model::find($id);
        if ($store->status===0) {
            $store->update(['status'=>1]);
            return response()->json('Activated');
        }
        return response()->json('Already Activated');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        if (request()->ajax()) {
          if(request()->user()){

          return $this->model::select('store_name', 'phone_number', 'location')
          ->where('user_id', request()->user()->id)
          ->first();
          }
          return $this->model::select('store_name', 'phone_number', 'location', 'user_id')->where('id', $id)->first();
        } else {
            return view('admin.home');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $store=$this->model::where('user_id',request()->user()->id)->firstOrFail();


        if (request()->ajax() && ($store || admin()->check())) {
          $storeID=$store?$store->id:$id;
          $data = $this->validate(request(), [
                'store_name' => "required|min:3|",
                'location' => "required",
                'phone_number' => 'required|numeric|min:11'
            ]);
          ;


            if ($this->model::find($storeID)->update($data)) {
                return getSuccessMessages('update',$this->tableName);
            } else {
                return 'error';
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        if (request()->ajax()) {
                 return $this->model::destroy([$id])?getSuccessMessages('delete',$this->tableName):'error';
        } else {
            return view('admin.home');
        }
    }
}
