<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductsOrders extends Model
{
    protected $fillable=[
    'id',
    'product_id',
    'price',
    'discount',
    'quantity',
    'store_order_id'
    ];
public function products()
{
    return $this->hasOne('App\Product','id','product_id')->select('id','product_name','image');
}
public function storeOrder()
{
    return $this->belongsToMany('App\Store','store_orders','id','store_id')->select('store_name');
}
}
