<?php

namespace App\Traits;
use App\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait ProductTrait
{
    private function getCategoryChild($categories,$ID =null){
        $data=[$ID];
        foreach($categories as $eachCategory){
            if(!empty($eachCategory['children'])){
                foreach($this->getCategoryChild($eachCategory['children']) as $eachChild){

                    array_push($data,$eachChild );
                }

            }
            array_push($data,$eachCategory['id']);
        }
        return $data;

    }
public function productsWithPendingProducts($with = ['category', 'offers','trademark']){
   return Product::with($with)
       ->select('products.id','image','products.amount','trademark_id','product_name','products.price')
       ->withCount(['rating'=>function($query){
           $query->select(DB::raw('avg(rating) as rating_avg'));
       }]);
}
    public function products($with = ['category', 'offers','trademark'])
    {
    return $this->productsWithPendingProducts($with)
       ->where('status',1);

    }
}

