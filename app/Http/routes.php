<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@renderView');

Route::get('/about', 'AboutController@renderView');

Route::get('/links', 'LinksController@renderView');

Route::get('/principles', 'PrinciplesController@renderView');