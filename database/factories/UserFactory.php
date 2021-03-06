<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => "Kế toán",
        'email' => 'ketoan@gmail.com',
        'password' => \Hash::make('secret'), 
        'role' => '5',
        'idkh' => '0',
        'remember_token' => str_random(10),
    ];
});