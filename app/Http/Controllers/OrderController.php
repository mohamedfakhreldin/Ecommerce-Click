<?php

namespace App\Http\Controllers;

use App\Offer;
use App\Orders;
use App\Product;
use App\ProductsOrders;
use App\Store;
use App\StoreOrder;
use App\StoreOrdersOrders;
use App\Traits\SuccessMessager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
  private $tableName = 'Order';
  private $model = "App\Order";
  use SuccessMessager;
  public function create()
  {
    config()->set('database.connections.mysql.strict', true);
    DB::reconnect();
    Orders::create(['user_id' => request()->user()->id])->createOrderItems()->saveMany($this->createStoreOrder(request('address')));
    config()->set('database.connections.mysql.strict', false);
    DB::reconnect();
    return $this->createMessage('Order');
  }

  private function createProductsItems()
  {
    $storeOrders = [];
    foreach (request('products') as $eachProduct) {
      $product = Product::where('id', $eachProduct['id'])->where('amount', '>', '0')->first();
      if ($product) {
        if ($product->amount > $eachProduct['quantity']) {
          $product->amount = $product->amount - $eachProduct['quantity'];
          $product->save();
          $offer = Offer::where('product_id', $eachProduct['id'])->first();
          $offerQuantity = $offer ?
            $offer->amount > 0 ?
            $offer->amount > $eachProduct['quantity'] ?
            $eachProduct['quantity'] : $offer->amount : 0 : 0;


          $offerQuantity > 0 ? Offer::find($offer->id)->update(['amount' => $offer->amount - $offerQuantity]) : null;
          $totalPrice = $product->price * $eachProduct['quantity'];
          $totalDiscount = $offerQuantity > 0 ? ($offer->discount) * $offerQuantity : 0;

          $storeData = new ProductsOrders(['product_id' => $product->id,'price' => $totalPrice, 'discount' => $totalDiscount, 'quantity' => $eachProduct['quantity']]);

          !isset($storeOrders["store$product->store_id"]) ?
            $storeOrders["store$product->store_id"] = [$storeData] : array_push($storeOrders["store$product->store_id"], $storeData);


          isset($storeOrders["store$product->store_id"]['total']) ?
            $storeOrders["store$product->store_id"]['total'] += $totalPrice : $storeOrders["store$product->store_id"]['total'] = $totalPrice;
          isset($storeOrders["store$product->store_id"]['discounts']) ?
            $storeOrders["store$product->store_id"]['discounts'] += $totalDiscount : $storeOrders["store$product->store_id"]['discounts'] = $totalDiscount;
        } else {
          return response()->json('Product Amount Not Enough', 422);
        }
      }
    }
    return $storeOrders;
  }
  private function createStoreOrder($address)
  {
    $userOrder = [];
    $errors = !$address ? response()->json(['errors' => ['Address Field is required']], 422) : null;

    foreach ($this->createProductsItems() as $key => $storeOrder) {
      $createStoreOrder = [
        'total' => $storeOrder['total'],
        'discount' => $storeOrder['discounts'],
        'address' => $address,
        'user_id' => request()->user()->id,
        'store_id' => str_replace('store', '', $key)
      ];

      unset($storeOrder['total']);
      unset($storeOrder['discounts']);
      $storeOrderAferCreate = StoreOrder::create($createStoreOrder)->storeOrderItems()->saveMany($storeOrder);

      $userOrder[] = new StoreOrdersOrders(['store_order_id' => $storeOrderAferCreate[0]->store_order_id]);
    }
    return $userOrder;
  }

  public function  getStoreOrders()
  {
    $store = Store::where('user_id', request()->user()->id)->first();
    $storeOrder = StoreOrder::with('storeOrderCustomer')->where('store_id', $store->id);
    return request('status') !== null ? $storeOrder->where('status', request('status'))->get() : $storeOrder->get();
  }
  public function  getUserOrders()
  {

    $orders = Orders::with('orderItems')
      ->select('id', DB::raw('DATE_FORMAT(orders.created_at, "%M %d %Y") as created_date'))
      ->where('user_id', request()->user()->id)
      
      ->orderByDesc('id')
      ->get();

    return $orders;
  }
  public function  getOrderItems($id)
  {
    $store = Store::where('user_id', request()->user()->id)->first() ||
      StoreOrder::where('user_id', request()->user()->id)->first() ? true : false;
    if ($store) {
      return ProductsOrders::with('products', 'storeOrder')->where('store_order_id', $id)->get();
    }
  }

  public function  updateStoreOrderStatus($id)
  {
    $store = Store::where('user_id', request()->user()->id)->first();
    $storeOrder =  StoreOrder::where('store_id', $store->id)->where('id', $id)->first();

    if ($storeOrder && request('status') >= 0 && request('status') <= 3 && $storeOrder->status <3) {
      if(request('status')===3){
        $orderItems =ProductsOrders::where('store_order_id', $id)->get();
        foreach($orderItems as $item){
          $product = Product::find( $item->product_id);

          $product->amount = $product->amount+$item->quantity;

          $product->save();
        }
      }
      $storeOrder->status = request('status');
      $storeOrder->save();
      return $this->updateMessage('Store Order');
    }
  }
}
