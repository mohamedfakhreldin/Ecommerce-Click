<?php

namespace App\Http\Controllers;

use App\Offer;
use App\Product;
use App\Store;
use App\Traits\SuccessMessager;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    use SuccessMessager;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
     $data= $this->validate(request(),[
          'amount'=>'numeric|required',
          'discount'=>'numeric|required',
          'end_at'=>'required|date',
          'product_id'=>'required'
      ]);
      $store=Store::select('id')->where('user_id',request()->user()->id)->first();
      $product=$store?Product::find($data['product_id'])->where('store_id',$store->id):false;

      $productOwnerCheck=$product->exists();
      $offer=Offer::where('product_id',$data['product_id'])->exists();

      $amountCheck=$product?$product->where('amount','>',$data['amount'])->exists():false;
      $data['start_at']=now();
     return $productOwnerCheck?
     $amountCheck?
     !$offer?
       Offer::create($data)?
        $this->createMessage('Offer',Offer::create($data))
        :null
        :response()->json(['errors'=>['You can\'t add more then one offer']],422)
        :response()->json(['errors'=>['Amount not enough']],422)
        :response()->json(['errors'=>['You aren\'t product owner']],422);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $offer=Offer::findOrFail($id);
        return $offer->delete($id)?$this->deleteMessage('Offer'):'';
    }
}
