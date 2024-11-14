<?php

use App\Http\Controllers\TablaDataArmonizacionController;
use App\Http\Controllers\DataArmonizacionController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TituloController;
use App\Http\Controllers\LogsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::resource('/titulos', TituloController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware('auth');

Route::resource('/logs', LogsController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware('auth');

Route::resource('/titulosPublicos', TituloController::class)
    ->only(['index']);

Route::resource('/logsPublicos', LogsController::class)
    ->only(['index']);

 Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
 })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
