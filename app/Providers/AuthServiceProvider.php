<?php

namespace App\Providers;

use Carbon\Carbon;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
     'App\Rating' => 'App\Policies\RatingPolicy',
     'App\Store' => 'App\Policies\StorePolicy',    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
        Passport::personalAccessTokensExpireIn(Carbon::now()->addHours(24));
        Passport::refreshTokensExpireIn(Carbon::now()->addDays(30));
        Passport::personalAccessClientId('13');
        Passport::personalAccessClientSecret('xqQ0gafOLawFAYZkmGokc7ptWQVKUruSLKSTvKLw');
    }
}