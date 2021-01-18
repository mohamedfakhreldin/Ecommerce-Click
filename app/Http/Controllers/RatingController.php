<?php

namespace App\Http\Controllers;

use App\Rating;
use App\StoreOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{

    public function checkStoreOrder($productID)
    {
        $productCanReview =StoreOrder::select('user_id')->leftJoin('products_orders', 'store_orders.id', '=', 'products_orders.store_order_id')
        ->where('user_id', request()->user()->id)->where('status','>',1)->where('product_id',$productID)->exists();
        $userHasReview=Rating::where('product_id',$productID)->where('user_id',request()->user()->id)->exists();
       return $productCanReview?$userHasReview?response()->json(['errors'=>['singleError'=>['You have already added your review']]],422):$productCanReview:response()->json(['errors'=>['singleError'=>['You must buy this product to add review']]],422);
    }
    public function create()
    {
        if ($this->checkStoreOrder(request('product_id'))) {
            $data = $this->validate(request(), [
                'product_id' => 'required',
                'comment' => 'sometimes|nullable|max:400',
                'rating' => 'between:1,5'

            ]);
            $data['user_id'] =  request()->user()->id;
             Rating::create($data) ;
        }
    }
    public function getNewReview($productID)
    {
        return Rating::select(
            'rating',
            'name',
            'comment',
            'ratings.id',
            DB::raw('DATE_FORMAT(ratings.created_at, "%M %d %Y") as created_date'),
            'user_id'

        )->where('product_id',$productID)->leftJoin('users','ratings.user_id','users.id')->orderByDesc('ratings.id')->first();
    }
    public function show($productID)
    {
        return Rating::select(
            'rating',
            'name',
            'comment',
            'ratings.id',
            DB::raw('DATE_FORMAT(ratings.created_at, "%M %d %Y") as created_date'),
            'user_id'

        )->where('product_id',$productID)->leftJoin('users','ratings.user_id','users.id')->orderByDesc('ratings.id')->paginate(4);
    }
    public function delete($id)
    {   $rating=  Rating::find($id);
       $this->authorize('delete',$rating);
     $rating->delete();
    }
}
