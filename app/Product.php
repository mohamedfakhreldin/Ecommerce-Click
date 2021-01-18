<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'id',
        'product_name',
        'store_id',
        'price',
        'category_id',
        'trademark_id',
        'product_description',
        'amount',
        'color_id',
        'image',
        
    ];
    protected $hidden =['percent'];
    public function getOwnerStore (){
        return $this->hasOne('App\Store','id','store_id')->select('id','store_name');
    }
    public function category(){
        return $this->hasOne('App\Category','id','category_id')->select('id','category_name');
    }
    public function trademark(){
        return $this->hasOne('App\Trademark','id','trademark_id')->select('id','name');
    }
    public function store(){
        return $this->hasOne('App\Store','id','store_id')->select('id','store_name');
    }
    public function color(){
        return $this->hasOne('App\Color','id','color_id')->select('id','color_code','color_name');
    }
    public function offers(){
        config()->set('database.connections.mysql.strict',false);
        DB::reconnect();
        return $this->hasOne('App\Offer','product_id','id');//->select('id','discount','amount');
        config()->set('database.connections.mysql.strict',true);
        DB::reconnect();
    }
    public function images() {

        return $this->hasMany('App\ProductImages','product_id','id');
    }
    public function favourite() {

        return $this->hasOne('App\Favourites','product_id','id')->where('user_id',Auth::guard('api')->user()?

        Auth::guard('api')->user()->id:null);
    }
    public function rating()
    {
       return $this->hasMany('App\Rating');
    }
    public function avgRating(){
        return $this->rating()->select('ratings.id',DB::raw('AVG(rating) AS avg_rating'));
    }

}
