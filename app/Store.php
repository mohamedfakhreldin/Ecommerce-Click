<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
  protected $fillable=[  'id', 'store_name','user_id','location','phone_number','status'
  ];
  public function getUser()
  {
    return $this->hasOne('App\User','id');
  }
}
