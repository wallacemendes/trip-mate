<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SharedUserController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResources([
        'trips' => TripController::class,
        'trips.activities' => ActivityController::class,
        'trips.activities.expenses' => ExpenseController::class,
    ]);
    Route::get('trips/{trip}/activities/cost/{date}', [ActivityController::class, 'getActivitiesByDay']);
    Route::post('/sharing/invite', [SharedUserController::class, 'share']);
    Route::post('/sharing/accept-invite', [SharedUserController::class, 'acceptInvitation']);
    Route::delete('/sharing/delete-token', [SharedUserController::class, 'deleteShareToken']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
//Route::apiResource('users', UserController::class);

