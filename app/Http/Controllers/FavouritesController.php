<?php

namespace App\Http\Controllers;

use App\Favourites;
use Illuminate\Http\Request;

class FavouritesController extends Controller
{
    private function addFavourite()
    {

        Favourites::create([
            'user_id' => request()->user()->id,
            'product_id' => request('id'),

        ]);
    }
    private function removeFavourite($favourite)
    {

        $favourite->delete();
    }
    public function toggleFavourite()
    {
        $favourite = Favourites::where('product_id', request('id'))->where('user_id', request()->user()->id)->first();

        $favourite ? $this->removeFavourite($favourite) : $this->addFavourite();
    }
    public function getFavourites()
    {
        return response()->json(Favourites::with(['products','offer'])->where('user_id',request()->user()->id)->get());
    }
}
