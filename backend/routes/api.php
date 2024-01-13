<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('records', RecordController::class);
Route::resource('categories', CategoryController::class);

Route::get('/records/{day}/{month}/{year}', [RecordController::class, 'getRecordOfDay']);
Route::post('/records/{id}', [RecordController::class, 'update']);
Route::post('/categories/{id}', [CategoryController::class, 'update']);
