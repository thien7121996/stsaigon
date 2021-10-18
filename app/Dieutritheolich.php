<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dieutritheolich extends Model
{
    protected $table = 'dieutritheolich';
    protected $fillable = ['ngay', 'idlich', 'dieutri', 'bacsi', 'trangthai', 'luuy', 'idkhammoi', 'idkhachhang'];
}
