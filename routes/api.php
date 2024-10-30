<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TablaDataArmonizacionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


use App\Http\Controllers\DataArmonizacionController;
//use App\Http\Controllers\TituloController;

// Route::resource('data-armonizacion', DataArmonizacionController::class);
//Route::resource('titulos', TituloController::class);
Route::get('/tabla-data-armonizacion', [TablaDataArmonizacionController::class, 'indexOne']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
