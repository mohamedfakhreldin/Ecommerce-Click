<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    protected $fillable=[
        'id',
        'img_name',
        'path',
        'product_id'
    ];
}
