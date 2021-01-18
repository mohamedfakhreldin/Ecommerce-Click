<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favourites extends Model
{
    protected $fillable = [
        'id',
        'product_id',
        'user_id'
    ];

public function products()
{
    return $this->hasOne('App\Product','id','product_id')->select('id','image','product_name','amount','price');
}
public function offer()
{
    return $this->hasOneThrough('App\Offer','App\Product','id','product_id','product_id')->select('offers.id','offers.amount','discount');
}
}
