<?php
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


$indexPageController='ProfileController@index';


Route::get('/login', function () {
    return view('welcome', ['title' => 'L']);
});

Route::get('/', function () {
    return view('welcome', ['title' => 'Home']);
});
Route::get('/cart', $indexPageController);
Route::get('/profile/{branch?}',$indexPageController );
Route::get('/store/dashboard/edit', $indexPageController);


//Start Store Group
Route::post('/store', 'Admin\CategoryController@storage');
Route::get('/store/dashboard/home', $indexPageController);
Route::get('/store/dashboard/orders', $indexPageController);
Route::get('/store/dashboard/products', $indexPageController);
Route::get('/store/dashboard/product/create', $indexPageController);
Route::get('/store/dashboard/product/edit/{id}', $indexPageController);
Route::post('/store/product/images','Admin\ProductController@storage');
//End Store Group


Route::get('/signup', $indexPageController);
Route::get('/products/{category}', 'Admin\CategoryController@getProducts');
Route::get('/search',$indexPageController);
Route::get('/product/show/{id}', $indexPageController);
Auth::routes();
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/home', 'HomeController@index')->name('home');
