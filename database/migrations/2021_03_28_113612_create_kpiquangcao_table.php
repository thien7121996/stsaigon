<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKpiquangcaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kpiquangcao', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('chiphimarketing');
            $table->integer('chuyendoi');
            $table->integer('sodienthoai');
            $table->integer('khachdatlich');
            $table->integer('khachden');
            $table->integer('khachlam');
            $table->integer('doanhthu');
            $table->integer('thucnhan');
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
        Schema::dropIfExists('kpiquangcao');
    }
}
