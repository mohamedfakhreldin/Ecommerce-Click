<?php

namespace App\Http\Controllers\Admin;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * IndexPage
     *
     * @return void
     */
    public function indexPage()
    {
        if(request()->ajax()):
            return response()->json(['products'=>$this->getLimitProduct()]);
        endif;

    }
    private function getLimitProduct()
    {
        return Product::orderBy('id','DESC')->limit(10)->get();
    }
}
