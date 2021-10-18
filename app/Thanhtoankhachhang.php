<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thanhtoankhachhang extends Model
{
    protected $table = 'thanhtoankhachhang';
    protected $fillable = ['ngaythanhtoan', 'chitietthanhtoan', 'tongtien', 'hinhthucthanhtoan', 'ghichu', 'nguoithutien', 'idkhammoi', 'idkhachhang'];
    public function khachhang()
	{
		return $this->belongsTo(Khachhang::class, 'idkhachhang','ID');
	}
    public function khammoi()
	{
		return $this->belongsTo(Khammoi::class, 'idkhammoi','id');
	}
}
