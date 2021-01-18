<?php

namespace App\Http\Controllers\Admin;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class Users extends Controller
{
    private $tableName = 'User';
    private $model="App\User";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        if(request()->ajax()){



            return $this->model::select(
                'id as ID',
                'name as Name',
                'email as Email',
                'created_at as Created At',
                'updated_at as Updated At'
            )->get();
        }else{
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
        $data=$this->validate(request(), [
        'name'=>"required|min:3",
        'email'=>'required|email|unique:users'
        ,'password'=>"required|confirmed|min:6"
    ]);
    $data['email']= ucfirst(strtolower($data['email']));
        $data['password']=bcrypt(request('password'));
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (request()->ajax()) {
            return $this->model::select('name', 'email')->where('id', $id)->first();
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
        if (request()->ajax()) {
            $data=$this->validate(request(), [
                'name'=>"required|min:3",
                'email'=>'required|email|unique:users'
            ,'password'=>"required|confirmed|min:6"
            ]);
           $data['email']= ucfirst(strtolower($data['email']));
            $data['password']=bcrypt(request('password'));
            if ($this->model::find($id)->update($data)) {
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
        return $this->model::destroy([$id])?getSuccessMessages('delete',$this->tableName):'error';
    }
}
