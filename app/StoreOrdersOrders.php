<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StoreOrdersOrders extends Model
{
    protected $fillable = [
        'id',
        'order_id',
        'store_order_id'
    ];
    public function orderItems() {

        return $this->hasOne('App\ProductsOrders','store_order_id','id')->get();
    }
    public function getStoreOrderOrders( )
    {
        return $this->belongsToMany('App\Store','store_orders_orders','aid','store_id','id')->select('store_name');
    }
}
