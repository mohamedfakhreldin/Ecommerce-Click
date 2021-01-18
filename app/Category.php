<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table='categories';

   protected $fillable=['parent','category_name','id','icon'];
   public function parent(){
       $result=$this->hasOne('App\Category','id','parent');
    return $result;
}
}
