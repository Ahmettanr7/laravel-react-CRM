<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\Product\ProductController;
use App\Http\Controllers\api\category\CategoryController;

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

Route::group(['prefix'=>'auth'],function(){
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
});

Route::group([ 
    'middleware'=>['auth:api']
],function(){
        Route::post('/logout',[AuthController::class,'logout']);
        Route::post('/authenticate',[AuthController::class,'authenticate']);
        Route::resource('/product',ProductController::class);
        Route::resource('/category',CategoryController::class);
    });
