<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'discount',
        'start_at',
        'end_at',
        'product_id',
        'amount'
    ];
}
