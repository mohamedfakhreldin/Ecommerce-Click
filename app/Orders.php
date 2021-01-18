<?php

namespace App;

use App\Store;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
   protected $fillable = [
        'id',
        'user_id',

    ];
    public function orderItems() {

        return $this->belongsToMany('App\StoreOrder','store_orders_orders','order_id');
    }
    public function createOrderItems() {

        return $this->hasMany('App\StoreOrdersOrders','order_id');
    }
    public function storeOrder()
{
    return $this->hasManyThrough('App\Store','App\StoreOrder','a','store_id','id')->select('store_name');
}
}
