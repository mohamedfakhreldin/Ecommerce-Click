<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StoreOrder extends Model
{
    protected $fillable = [
        'id',
        'total',
        'discount',
        'address',
        'user_id',
        'store_id'
    ];
    public function storeOrderItems() {

        return $this->hasMany('App\ProductsOrders');
    }
    public function storeOrderCustomer() {

        return $this->hasOne('App\User','id','user_id')->select('id','name','email');
    }
    public  function storeData()
    {
        return $this->hasOne('App\Store');
    }
}
