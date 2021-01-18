<?php

namespace App\Http\Controllers\Admin;

use App\Traits\ProductTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{

    use ProductTrait;
  public function doSearch()
  {
      if(request('column') && request('search_query') && request('table')){
        $requestColumn=strtolower(str_replace(' ','_',request('column')));

        $result=DB::table(request('table'));
        foreach(request('selectColumns') as $key=>$value){
            $result->addSelect("$key as $value");
        }
        $result->where($requestColumn,'like','%'.request('search_query').'%' )->get();
        return $result;
    }

  }
  public function productsSearch()
  {

    return request('q')?  $this->products()->withCount(['favourite as favourite'])->where('product_name','like',"%".request('q')."%")->paginate(4):null;


  }
  public function productsSearchList()
  {
    config()->set('database.connections.mysql.strict',false);
    DB::reconnect();
    $products= request('q')?$this->products()->groupBy('product_name')->where('product_name','like',"%".request('q')."%")->limit(4)->get()->toArray():[];
    config()->set('database.connections.mysql.strict', true);
    DB::reconnect(); //importan
    return $products;
}
}
