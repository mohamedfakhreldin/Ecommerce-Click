<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteDependencyResolverTrait;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('user/signup','Admin\Users@store');
Route::middleware('auth:api')->any('/logout','Users@logout');
Route::post('/login','Users@login');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Start ProfileApi Controller Routes
Route::middleware('auth:api')->any('/profile/','ApiControllers\ProfileApiController@index');
Route::middleware('auth:api')->get('/checkstore/','ApiControllers\ProfileApiController@checkStore');
Route::middleware('auth:api')->put('/profile/edit/{id}','ApiControllers\ProfileApiController@updateAccount');
Route::middleware('auth:api')->get('/products/all','ApiControllers\ProfileApiController@getStoreProducts');
//End ProfileApi Controller Routes

//Start Product Controller Routes
Route::middleware('auth:api')->get('/product/create','Admin\ProductController@create');
Route::middleware('auth:api')->get('/product/edit/{id}','Admin\ProductController@edit');
Route::middleware('auth:api')->post('/product/favourite','FavouritesController@toggleFavourite');
Route::middleware('auth:api')->get('/profile/favourites','FavouritesController@getFavourites');
Route::get('/product/{id}','Admin\ProductController@showUserPage');
Route::middleware('auth:api')->put('/product/edit/save/{id}','Admin\ProductController@update');
Route::middleware('auth:api')->delete('/product/delete/{id}','Admin\ProductController@destroy');
Route::post('/store/product/images','Admin\ProductController@storage');
Route::middleware('auth:api')->post('/product/create/save','Admin\ProductController@store');
//End Product Controller Routes

//Start Offer Controller Routes
Route::middleware('auth:api')->delete('/offer/{id}','OfferController@destroy');
Route::middleware('auth:api')->post('/offer/create/','OfferController@store');
//End Offer Controller Routes

// Start Review Controller Routes
Route::middleware('auth:api')->post('/review/create/','RatingController@create');
Route::middleware('auth:api')->get('/check/product/{productID}','RatingController@checkStoreOrder');
Route::middleware('auth:api')->delete('/review/delete/{id}','RatingController@delete');
Route::get('/product/reviews/{productID}','RatingController@show');
Route::get('/product/reviews/lastinserted/{productID}','RatingController@getNewReview');
//Start Order Controller Routes
Route::middleware('auth:api')->post('/order/create/save', 'OrderController@create');
Route::middleware('auth:api')->post('/order/create/','OrderController@store');
Route::middleware('auth:api')->get('/store/dashboard/orders/','OrderController@getStoreOrders');
Route::middleware('auth:api')->post('/store/orders/status/update/{id}','OrderController@updateStoreOrderStatus');
Route::middleware('auth:api')->get('/profile/orders/','OrderController@getUserOrders');
Route::middleware('auth:api')->get('/profile/order/items/{id}','OrderController@getOrderItems');
//End Order Controller Routes

//Start Product Controller Routes
Route::get('/menu',"Admin\CategoryController@getMenu");
Route::get('/home',"Admin\ProductController@topProducts");
Route::get('/products/search', 'Admin\SearchController@productsSearch');
Route::get('/searchlist', 'Admin\SearchController@productsSearchList');
Route::get('/products/{category}',"Admin\CategoryController@getProducts");
Route::middleware('auth:api')->post('/store/create','Admin\StoreController@store');


Route::middleware('auth:api')->put('/store/update/{id}','Admin\StoreController@update');
Route::middleware('auth:api')->get('/store/edit/{id}','Admin\StoreController@edit');
