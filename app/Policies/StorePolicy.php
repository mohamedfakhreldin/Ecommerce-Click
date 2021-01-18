<?php

namespace App\Policies;

use Admin;
use App\Store;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class StorePolicy
{
    use HandlesAuthorization;


    public function create(Admin $admin, User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Store  $store
     * @return mixed
     */
    public function update(User $user, Store $store)
    {
        return $user->id===$store->user_id || admin();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Store  $store
     * @return mixed
     */
    public function delete(User $user, Store $store)
    {
        if ($user instanceof Admin) {
            return $user->id == $store->user_id;

        }
        // Is an Admin
        return true;
    }


}
