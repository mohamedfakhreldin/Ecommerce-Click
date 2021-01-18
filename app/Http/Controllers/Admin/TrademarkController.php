<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Http\Request;
use App\Traits\SuccessMessager;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class TrademarkController extends Controller
{
    use SuccessMessager;
    private $tableName = 'Trademark';
    private $model="App\Trademark";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(request()->ajax()){



            return $this->model::select(
                'id as Id',
                'name as Name',
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
        $data=$this->validate(request(),[
            'name'=>"required|min:3|unique:trademarks",
            'logo'=>"sometimes|nullable|image|mimetypes:png,jpg,jpeg"
        ]);
        $data['password']=bcrypt(request('password'));
            if($this->model::create($data)){


                return $this->createMessage($this->tableName);
            }else{
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
        if(request()->ajax()){

            return $this->model::select('name','logo')->where('id',$id)->first();
        }else{
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
        if(request()->ajax()){
            $data=$this->validate(request(),[
                'name'=>"required|min:6",
                'logo'=>"sometimes|nullable|image|mimetypes:png,jpg,jpeg"
            ]);
            $data['password']=bcrypt(request('password'));
                if($this->model::find($id)->update($data)){


                    return $this->updateMessage($this->tableName);
                }else{
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
    {if(request()->ajax()){

             return $this->model::destroy([$id])?$this->deleteMessage($this->tableName):'error';
    }else{
        return view('admin.home');
    }

    }
}
