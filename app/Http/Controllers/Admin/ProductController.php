<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Color;
use App\Product;
use App\ProductImages;
use App\Store;
use App\Trademark;
use App\Traits\ProductTrait;
use App\Traits\SuccessMessager;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends \App\Http\Controllers\Controller
{
    use SuccessMessager,ProductTrait ;
    private $tableName = 'Product';
    private $model = "App\Product";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //     private function selectData()
    // {
    //     $mainTable='categories';

    //     $fourthTable='categories';
    //     $secondTable='store';
    // //     return [

    // //         "$mainTable.ID",
    // //         "$mainTable.Name",
    // //         "$mainTable.Price",
    // //         "$secondTable.store_name  as Store ",
    // //         "$thirdTable.trademark_name  as Trademark ",
    // //         "$fourthTable.category_name  as Category ",
    // //         "$mainTable.created_at as Created At",
    // //         "$mainTable.updated_at as Updated At"

    // //     ];
    // // }


    public function topProducts()
    {
        $productsRand = $this->products()->withCount('favourite as favourite')->inRandomOrder()->limit(5)->get();
        $productLatest = $this->products()->withCount('favourite as favourite')->latest()->limit(5)->get();
        $productDiscount = $this->products()
        ->withCount('favourite as favourite')
        ->leftJoin('offers','products.id','=','offers.product_id')
        ->addSelect(DB::raw('offers.discount/price AS percent '))
        ->distinct('id')
        ->orderBy('percent','desc')
        ->limit(5)->get();

        $productSelling = $this->products()
        ->withCount('favourite as favourite')
        ->leftJoin('products_orders','products.id','=','products_orders.product_id')
        ->addSelect(DB::raw('sum(quantity) as sells '))
        ->orderBy('sells','desc')
        ->groupBy('product_id')
        ->limit(5)->get();
        return response()->json(['latest'=>$productLatest,
         'random'=>$productsRand,
         'selling'=>$productSelling,
         'discount'=>$productDiscount]);
    }
    public function index()
    {
        if (request()->ajax()) {

            return $this->model::with(['category', 'trademark'])->orderByDesc('id')->get();
        } else {

            return view('admin.home');
        }
    }

    /**
     * get Categories Option when its request by edit
     */
    public function getCategoriesSelectOptions()
    {
        if (request()->ajax()) {
            $requestId = request('id') ? request('id') : '';

            $categories = $this->model::select('id  as value', 'category_name as label', 'parent')->where('id', '!=', $requestId);
            if ($requestId) {
                $categories = $categories->get();
                return sub_categories($categories, $requestId);
            } else {
                return $categories->get();
            }
        } else {
            return view('admin.home');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $colors = Color::all();
        $trademarks = Trademark::all();
        $categories = buildTree(Category::select('*')->get());
        return response()->json(['colors' => $colors, 'trademarks' => $trademarks, 'categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $this->validate(request(), [
            "product_description" => 'string|required|min:45',
            "product_name" => 'required|min:5',
            'price' => 'required|numeric',
            'trademark_id' => 'required|numeric',
            'amount' => 'required|numeric',
            'category_id' => 'required|numeric',
            'color_id' => 'required|numeric',
            'image' => 'required',
        ]);

        $data['store_id'] = Store::where('user_id', $request->user()->id)->first()->id;


        $data['image'] =  imageUploader()->moveFile($data['image']['path']);
        if (request('images')) {
            $imagesArray = [];
            foreach (request('images') as $images) {
                $images['path'] = imageUploader()->moveFile($images['path']);
                $imagesArray[] = new ProductImages($images);
            }
            return $this->model::create($data)->images()->saveMany($imagesArray) ? $this->createMessage($this->tableName) : 'error';
        }
        return $this->model::create($data) ? $this->createMessage($this->tableName) : response([],500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      if(admin()->check()){
        $product = $this->productsWithPendingProducts(['trademark', 'images', 'offers', 'color', 'store','rating'])
        ->addSelect('product_description','color_id','store_id')
        ->withCount('favourite as favourite')
        ->where('id', $id)->first();
      }else{

        $product = $this->products(['trademark', 'images', 'offers', 'color', 'store','rating'])
        ->addSelect('product_description','color_id','store_id')
        ->withCount('favourite as favourite')
        ->where('id', $id)->firstOrFail();
      }

        $product['product_description'] = str_replace('[', '<strong>', $product['product_description']);
        $product['product_description']  = str_replace(']', '</strong>', $product['product_description']);
        $product['product_description']  = nl2br($product['product_description']);
        return $product?$product:NULL;
    }

    public function showUserPage($id)
    {
       $product= $this->show($id);
       $var = $this->products()->inRandomOrder()
       ->withCount('favourite as favourite')
       ->where('products.id','!=',$product['id']);
       $similarProducts =$var->where(function($q) use($product){
       $q ->where('category_id',$product['category_id'])->
        orWhere('trademark_id',$product['trademark_id']);
       })

     ->limit(5)->get();
        return response()->json(['similar_products'=>$similarProducts,'product'=>[$product]]);
    }
    public function storage()
    {
        // $data=$this->validate(request(),[
        //     'images'=>'required|mimes:png,jpg,jpeg|min :1|max:1500000',
        // ]);

        if (request()->file()) {
            $files = [];
            if (is_array(request()->file('images'))) {

                foreach (request()->file('images') as $image) {
                    # code...
                    array_push($files, imageUploader()->singleStore($image));
                }
                return $files;
            } else {
                return imageUploader()->singleStore(request()->file('images'));
            }
        } else {
            return 'no';
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (request()->ajax()) {
            $product = $this->model::with(['images','category'])->findOrFail($id);
            $colors = Color::all();
            $trademarks = Trademark::all();
            $categories = buildTree(Category::select('*')->get());
            $images = ProductImages::where('product_id', $product->id)->get();
            return response()->json(['images' => $images, 'product' => $product, 'colors' => $colors, 'trademarks' => $trademarks, 'categories' => $categories]);
        }
    }


public function productPage()
{
  return view('admin.home');
}
    /**
     * updateProductStatus
     *
     * @param  mixed $id
     * @return void
     */
    public function updateProductStatus($id)
    {
        $store = $this->model::find($id);
        if ($store->status === 0) {
            $store->status = 1;
            if ($store->save()) :
                return response()->json('Activated');
            endif;
        }elseif($store->status === 1){
          $store->status = 0;
          if ($store->save()) :
              return response()->json('Pending');
          endif;
        }
        return response()->json('Already Activated');
    }
public function rejectProduct($id)
{
 $product= Product::find($id);
 $product->rejection_reason=request('rejection_reason');
 $product->save();
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
        if (request()->ajax()) {
            $product = $this->model::findOrFail($id);
            $data = $this->validate(request(), [
                "product_description" => 'string|required|min:45',
                "product_name" => 'required|min:5',
                'price' => 'required|numeric',
                'trademark_id' => 'required|numeric',
                'amount' => 'required|numeric',
                'category_id' => 'required|numeric',
                'color_id' => 'required|numeric',
                'image' => 'sometimes|nullable'
            ]);
              $data['status']=0;
              $data['rejection_reason']=null;
              $data['image'] = $data['image'] && $data['image']!==$product->image?
              imageUploader()->moveFile($data['image']['path']):$product->image;
              if (request('images')) {

                foreach (request('images') as $images) {

                  $imagesSelect = ProductImages::where('img_name', $images['img_name'])->where('product_id', $product->id);

                    if ($imagesSelect->exists()) {
                      if($images['path']!==$imagesSelect->first()->path){

                        $images['path']=imageUploader()->moveFile($images['path']);
                        $imagesSelect->update($images);
                      }
                    } else {
                      $images['product_id'] = $product->id;
                      $images['path']=imageUploader()->moveFile($images['path']);
                      ProductImages::create($images);
                    }
                  }
                }

              if ($product->update($data)) {
                $product->status=0;
                $product->rejection_reason=null;


                return $product->save()? $this->updateMessage($this->tableName):response()->json(['Product Update Error'],422);
            } else {
                return 'error';
            }
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (request()->ajax()) {
            $product = $this->model::findOrFail($id);
            $store = Store::findOrFail($product->store_id);
            if ($store->user_id === request()->user()->id || admin()->id) {

                return $this->model::destroy([$id]) ? getSuccessMessages('delete', $this->tableName) : 'error';
            }
        } else {
            return view('admin.home');
        }
    }
}
