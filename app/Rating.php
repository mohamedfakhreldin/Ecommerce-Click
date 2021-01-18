<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
   protected $fillable=[
       'id',
       'product_id',
       'user_id',
       'rating',
       'comment'
   ];
   
}
