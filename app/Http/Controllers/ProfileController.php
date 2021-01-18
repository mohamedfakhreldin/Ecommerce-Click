<?php

namespace App\Http\Controllers;

use App\Store;
use App\User;
use Illuminate\Http\Request;

use function Ramsey\Uuid\v1;

class ProfileController extends Controller
{

    /**
     * @param $branch subpage of profile
     * @return  $branch data and Profile page
     */
    public function index(){


        return view('layouts.app',['title'=>'Loading']);
    }







}
