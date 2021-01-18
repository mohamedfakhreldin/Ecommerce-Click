<?php

use Illuminate\Support\Facades\Route;



Route::prefix('admin')->namespace('Admin')->group(function(){
    //	Config::set('auth.defines', 'admin');
    Route::get('user/data','AdminAuth@getUserData');

Route::get('/logout',"AdminAuth@logout");
Route::get('/login',"AdminAuth@getLoginPage");
Route::post('/login',"AdminAuth@login")
;

Route::group(['middleware'=>'admin:admin'],function(){
  Route::get('/product/show/{id}','ProductController@productPage' );
  Route::post('/product/rejection/{id}','ProductController@rejectProduct' );
  Route::get('product/{id}','ProductController@show' );
Route::resource('tables/users','Users');
Route::get('/search',"SearchController@doSearch");
Route::get('getcategoriesoptions','CategoryController@getCategoriesSelectOptions');
Route::get('dashboard','DashboardController@indexPage');
Route::post('dashboard/status/{id}','ProductController@updateProductStatus');
// Route::post('tables/users/create',"Users@anything");
// Route::get('tables/users/create',"Users@create");
Route::resource('tables/admins','AdminController');
Route::get('tables/products','ProductController@index');
Route::resource('tables/trademarks','TrademarkController');
Route::resource('tables/colors','ColorController');
Route::resource('tables/stores','StoreController');
Route::put('tables/stores/updatestatus/{id}','StoreController@updateStoreStatus');
Route::resource('tables/categories','CategoryController');
    Route::get('/',function(){
        return view('admin.home');
    });

});




});
