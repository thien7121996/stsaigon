<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLichsutichluyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lichsutichluy', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('khachhangdichvu');
            $table->string('chitiettichdiem');
            $table->integer('tienthanhtoan');
            $table->integer('khachhanggioithieu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lichsutichluy');
    }
}
