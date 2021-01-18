<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use  DispatchesJobs, ValidatesRequests,
     AuthorizesRequests {
        authorize as protected baseAuthorize;
    }

    public function authorize($ability, $arguments = [])
    {
        if (Auth::guard('admin')->check()) {
            Auth::shouldUse('admin');
        }

        $this->baseAuthorize($ability, $arguments);
    }
}
