<?php



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'ApiController@login');
Route::get('infouser/{id}', 'ApiController@infouser');


Route::get('nguongioithieu', 'NguonGioiThieuController@index');

	 Route::get('phieuchi', 'PhieuChiController@index');
Route::post('phieuchi', 'PhieuChiController@store');
Route::get('phieuchidelete/{id}', 'PhieuChiController@destroy');
Route::post('phieuchiupdate/{id}', 'PhieuChiController@update');
Route::post('phieuchixemngay', 'PhieuChiController@loctheongay');



Route::get('dichvusanpham', 'SanPhamDichVuController@index');
Route::post('dichvusanpham', 'SanPhamDichVuController@store');
Route::get('dichvusanphamdelete/{id}', 'SanPhamDichVuController@destroy');
Route::post('dichvusanphamupdate/{id}', 'SanPhamDichVuController@update');
Route::post('danhsachdichvu', 'SanPhamDichVuController@sanphamdichvutheonguoidung');
Route::get('sanphamdichvutheoid/{id}', 'SanPhamDichVuController@sanphamdichvutheoid');

Route::get('donthuoc', 'DonThuocController@index');
Route::post('donthuoc', 'DonThuocController@store');
Route::get('donthuoc/{id}', 'DonThuocController@show');
Route::get('donthuocdelete/{id}', 'DonThuocController@destroy');
Route::get('donthuoctheokhachhang/{id}', 'DonThuocController@donthuoctheokhachhang');
Route::post('donthuocupdate/{id}', 'DonThuocController@update');

Route::get('chandoan', 'ChanDoanCacLoaiController@index');
Route::post('chandoan', 'ChanDoanCacLoaiController@store');
Route::get('chandoandelete/{id}', 'ChanDoanCacLoaiController@destroy');
Route::post('chandoanupdate/{id}', 'ChanDoanCacLoaiController@update');

Route::get('tiensubenh', 'TienSuBenhController@index');
Route::post('tiensubenh', 'TienSuBenhController@store');
Route::get('tiensubenhdelete/{id}', 'TienSuBenhController@destroy');
Route::post('tiensubenhupdate/{id}', 'TienSuBenhController@update');

Route::get('labocongty', 'LaboCongTyController@index');
Route::post('labocongty', 'LaboCongTyController@store');
Route::get('labocongtydelete/{id}', 'LaboCongTyController@destroy');
Route::post('labocongtyupdate/{id}', 'LaboCongTyController@update');
Route::get('chitietlabocongty/{id}', 'LaboCongTyController@chitietlabocongty');

Route::get('labocongviec', 'LaboCongViecController@index');
Route::post('labocongviec', 'LaboCongViecController@store');
Route::get('labocongviecdelete/{id}', 'LaboCongViecController@destroy');
Route::post('labocongviecupdate/{id}', 'LaboCongViecController@update');
Route::get('chitietlabocongviec/{id}', 'LaboCongViecController@chitietlabocongviec');

Route::get('tiensubenh', 'TienSuBenhController@index');
Route::post('tiensubenh', 'TienSuBenhController@store');
Route::get('tiensubenhdelete/{id}', 'TienSuBenhController@destroy');
Route::post('tiensubenhupdate/{id}', 'TienSuBenhController@update');
Route::post('danhsachtiensubenh', 'TienSuBenhController@tiensubenhtheonguoidung');

Route::get('nguongioithieu', 'NguonGioiThieuController@index');
Route::post('nguongioithieu', 'NguonGioiThieuController@store');
Route::get('nguongioithieudelete/{id}', 'NguonGioiThieuController@destroy');
Route::post('nguongioithieuupdate/{id}', 'NguonGioiThieuController@update');
Route::get('nguongioithieudetail/{id}', 'NguonGioiThieuController@xemchitiet');

Route::get('dichvu', 'DichVuDieuTriController@index');
Route::post('dichvu', 'DichVuDieuTriController@store');
Route::get('dichvudelete/{id}', 'DichVuDieuTriController@destroy');
Route::post('dichvuupdate/{id}', 'DichVuDieuTriController@update');
Route::get('dichvudetail/{id}', 'DichVuDieuTriController@xemchitiet');
Route::post('danhsachdichvu', 'DichVuDieuTriController@dichvutheonguoidung');

Route::get('nhomkhachhang', 'NhomKhachHangController@index');
Route::post('nhomkhachhang', 'NhomKhachHangController@store');
Route::get('nhomkhachhangdelete/{id}', 'NhomKhachHangController@destroy');
Route::post('nhomkhachhangupdate/{id}', 'NhomKhachHangController@update');
Route::get('tennhomkhachhang/{id}', 'NhomKhachHangController@tennhomkhachhang');

Route::get('thuoc', 'ThuocDuocPhamController@index');
Route::post('thuoc', 'ThuocDuocPhamController@store');
Route::get('thuocdelete/{id}', 'ThuocDuocPhamController@destroy');
Route::post('thuocupdate/{id}', 'ThuocDuocPhamController@update');
Route::get('laytenthuoc/{id}', 'ThuocDuocPhamController@gettenthuoc');

Route::get('dungcu', 'DungCuVatLieuController@index');
Route::post('dungcu', 'DungCuVatLieuController@store');
Route::get('dungcudelete/{id}', 'DungCuVatLieuController@destroy');
Route::post('dungcuupdate/{id}', 'DungCuVatLieuController@update');

Route::get('chuongtrinh', 'ChuongTrinhKhuyenMaiController@index');
Route::post('chuongtrinh', 'ChuongTrinhKhuyenMaiController@store');
Route::get('chuongtrinhdelete/{id}', 'ChuongTrinhKhuyenMaiController@destroy');
Route::post('chuongtrinhupdate/{id}', 'ChuongTrinhKhuyenMaiController@update');
Route::get('chuongtrinh/{id}', 'ChuongTrinhKhuyenMaiController@show');

Route::get('phieudieutri', 'PhieuDieuTriController@index');
Route::post('phieudieutri', 'PhieuDieuTriController@store');
Route::get('phieudieutridelete/{id}', 'PhieuDieuTriController@destroy');
Route::post('phieudieutriupdate/{id}', 'PhieuDieuTriController@update');
Route::get('phieudieutri/{id}', 'PhieuDieuTriController@show');
Route::get('phieudieutrikhachhang/{id}', 'PhieuDieuTriController@indexkhachhang');
Route::get('phieudieutrikhachhangtheolich/{id}', 'PhieuDieuTriController@indexphieutheolich');

Route::get('ketquadieutri', 'KetQuaDieuTriController@index');
Route::post('ketquadieutri', 'KetQuaDieuTriController@store');
Route::get('ketquadieutridelete/{id}', 'KetQuaDieuTriController@destroy');
Route::post('ketquadieutriupdate/{id}', 'KetQuaDieuTriController@update');
Route::get('ketquadieutri/{id}', 'KetQuaDieuTriController@indexkhachhang');
Route::get('ketquadieutrikhachhang/{id}', 'KetQuaDieuTriController@indexkhachhang');
Route::get('ketquadieutriid/{id}', 'KetQuaDieuTriController@indexketqua');

Route::get('quatrinhdieutri', 'QuaTrinhDieuTriController@index');
Route::post('quatrinhdieutri', 'QuaTrinhDieuTriController@store');
Route::get('quatrinhdieutridelete/{id}', 'QuaTrinhDieuTriController@destroy');
Route::post('quatrinhdieutriupdate/{id}', 'QuaTrinhDieuTriController@update');
Route::get('quatrinhdieutri/{id}', 'QuaTrinhDieuTriController@indexkhachhang');
Route::get('quatrinhdieutrikhachhang/{id}', 'QuaTrinhDieuTriController@indexkhachhang');

Route::get('thongkenhap', 'ThongKeNhapController@index');
Route::post('thongkenhap', 'ThongKeNhapController@store');
Route::post('thongkeupdate/{id}', 'ThongKeNhapController@update');
Route::get('thongkenhapdelete/{id}', 'ThongKeNhapController@destroy');
Route::get('thongkenhapchitiet/{id}', 'ThongKeNhapController@show');
Route::post('thongkenhapxemngay', 'ThongKeNhapController@loctheongay');
Route::post('thongkenhapdungcu', 'ThongKeNhapController@locdungcu');
Route::get('thongkenhaptongcong', 'ThongKeNhapController@tongcong');
Route::get('thongkenhapdatra', 'ThongKeNhapController@datra');
Route::get('thongkenhapconlai', 'ThongKeNhapController@conlai');

Route::get('tongsotienchi', 'PhieuChiController@tinhtong');
Route::get('tiensubenh', 'TienSuBenhController@index');

Route::get('khammoi/{id}', 'KhamMoiController@index');
Route::get('khammoidsbenhly/{id}', 'KhamMoiController@indexnosame');
Route::get('benhly/{id}', 'KhamMoiController@benhly');
Route::get('getallkhammoi', 'KhamMoiController@getallkhammoi');
Route::get('getallkhammoitrongngay', 'KhamMoiController@getallkhammoitrongngay');
Route::get('getallkhammoibacsi/{id}', 'KhamMoiController@getallkhammoibacsi');
Route::get('getallkhammoitheobacsi/{id}', 'KhamMoiController@getallkhammoitheobacsi');
Route::post('khammoi', 'KhamMoiController@store');
Route::get('khammoidelete/{id}', 'KhamMoiController@destroy');
Route::post('khammoiupdate/{id}', 'KhamMoiController@update');
Route::get('chitietkhammoi/{id}', 'KhamMoiController@chitietkhammoi');
Route::get('chitietkhammoikhachhang/{id}', 'KhamMoiController@chitietkhammoikhachhang');
Route::get('laysoanh/{id}', 'KhamMoiController@laysoanh');

Route::get('dieutritheolich/{id}', 'DieuTriTheoLichController@index');
Route::post('dieutritheolich', 'DieuTriTheoLichController@store');
Route::get('dieutritheolichdelete/{id}', 'DieuTriTheoLichController@destroy');
Route::post('dieutritheolichupdate/{id}', 'DieuTriTheoLichController@update');
Route::get('chitietdieutritheolich/{id}', 'DieuTriTheoLichController@chitietdieutritheolich');
Route::get('laysoanhdieutri/{id}', 'DieuTriTheoLichController@laysoanh');

Route::get('chiphi/{id}', 'ChiPhiController@index');
Route::post('chiphi', 'ChiPhiController@store');
Route::get('chiphidelete/{id}', 'ChiPhiController@destroy');
Route::post('chiphiupdate/{id}', 'ChiPhiController@update');
Route::get('chitietchiphi/{id}', 'ChiPhiController@chitietchiphi');
Route::get('thongkechiphikhammoi/{id}', 'ChiPhiController@sumchiphi');
Route::get('thongkechiphikhammoikhachhang/{id}', 'ChiPhiController@sumchiphitheokhachhang');
Route::get('tienconnokhachhang/{id}', 'ChiPhiController@tienconnokhachhang');
Route::get('doanhthutienno', 'ChiPhiController@doanhthutienno');
Route::get('doanhthutong', 'ChiPhiController@doanhthutong');
Route::get('doanthuthucnhan', 'ChiPhiController@doanthuthucnhan');

Route::get('doanhthutiennotheothang/{id}', 'ChiPhiController@doanhthutiennotheothang');
Route::get('doanhthutongtheothang/{id}', 'ChiPhiController@doanhthutongtheothang');
Route::get('doanthuthucnhantheothang/{id}', 'ChiPhiController@doanthuthucnhantheothang');

Route::get('thanhtoandaxoa/{id}', 'ThanhToanDaXoaController@index');
Route::get('thanhtoan/{id}', 'ThanhToanKhachHangController@index');
Route::post('thanhtoan', 'ThanhToanKhachHangController@store');
Route::get('thanhtoandelete/{id}', 'ThanhToanKhachHangController@destroy');
Route::post('thanhtoanupdate/{id}', 'ThanhToanKhachHangController@update');
Route::get('chitietthanhtoan/{id}', 'ThanhToanKhachHangController@chitietthanhtoan');
Route::get('chitietthanhtoantheokhammoi/{id}', 'ThanhToanKhachHangController@chitietthanhtoantheokhammoi');
Route::get('thanhtoanthongke/{id}', 'ThanhToanKhachHangController@thanhtoanthongke');
Route::get('thanhtoanthongkekhachhang/{id}', 'ThanhToanKhachHangController@thanhtoanthongkekhachhang');

Route::post('doctor', 'DoctorController@store');
Route::get('doctor', 'DoctorController@index');
Route::get('doctordelete/{id}', 'DoctorController@destroy');
Route::get('bacsitheoid/{id}', 'DoctorController@bacsitheoid');
Route::post('capnhatbacsi/{id}', 'DoctorController@capnhatbacsi');

Route::post('lichlamviec', 'ThoiGianBieuController@store');

Route::get('lichlamviec', 'ThoiGianBieuController@index');
Route::get('lichlamviectheothang/{id}', 'ThoiGianBieuController@indextheothang');
Route::get('lichlamviecdelete/{id}', 'ThoiGianBieuController@destroy');
Route::post('lichlamviecupdate/{id}', 'ThoiGianBieuController@update');
Route::get('lichlamviecchitiet/{id}', 'ThoiGianBieuController@lichlamviecchitiet');
Route::get('deletelichlamviec/{id}', 'ThoiGianBieuController@destroy');
Route::get('lichlamviectheokhachhang/{id}', 'ThoiGianBieuController@lichlamvieckhachhang');
Route::get('lichhendieutri/{id}', 'ThoiGianBieuController@lichhendieutri');
Route::get('lichhendieutritheoid/{id}', 'ThoiGianBieuController@lichhendieutritheoid');
Route::get('lichhentheobacsi/{id}', 'ThoiGianBieuController@lichhentheobacsi');
Route::get('laytenkhtheobacsi/{id}', 'ThoiGianBieuController@laytenkhtheobacsi');
Route::post('boloclichhen', 'ThoiGianBieuController@boloclichhen');
Route::get('testlichhen', 'ThoiGianBieuController@testlichhen');

Route::get('customers', 'KhachhangController@index');
Route::post('customers', 'KhachhangController@store');
Route::post('customers/{id}', 'KhachhangController@update');
Route::get('customersdelete/{id}', 'KhachhangController@xoakhachhang');
Route::get('chitietkhachhang/{id}', 'KhachhangController@chitietkhachhang');
Route::post('bolockhachhang', 'KhachhangController@bolockhachhang');
Route::post('bolocdoanhthukh', 'KhachhangController@bolocdoanhthukh');
Route::post('bolocdoanhthukhtheothang/{id}', 'KhachhangController@bolocdoanhthukhtheothang');
Route::get('tongkhachhang', 'KhachhangController@tongkhachhang');
Route::get('laytienkhtong', 'KhachhangController@laytienkhtong');
Route::get('laytienkhdatt', 'KhachhangController@laytienkhdatt');
Route::get('laytienkhdatttheothang/{id}', 'KhachhangController@laytienkhdatttheothang');
Route::get('laytienkhtongtheothang/{id}', 'KhachhangController@laytienkhtongtheothang');
Route::get('tongkhachhangtheothang/{id}', 'KhachhangController@tongkhachhangtheothang');
Route::get('indexbyidbacsi/{id}', 'KhachhangController@indexbyidbacsi');

Route::get('photodieutri/{id}', 'AnhDieuTriController@getPhotos');
Route::post('photodieutri', 'AnhDieuTriController@uploadPhotos');
Route::get('xoaanhdieutri/{id}', 'AnhDieuTriController@destroy');

Route::get('photolichhen/{id}', 'AnhLichHenController@getPhotos');
Route::post('photolichhen', 'AnhLichHenController@uploadPhotos');
Route::get('xoaanhlichhen/{id}', 'AnhLichHenController@destroy');

Route::get('projects', 'ProjectController@index');
Route::post('signup', 'FrontEndUserController@signUp');
Route::post('projects', 'ProjectController@store');
Route::get('projects/{id}', 'ProjectController@show');
Route::put('projects/{project}', 'ProjectController@markAsCompleted');
Route::post('tasks', 'TaskController@store');
Route::put('tasks/{task}', 'TaskController@markAsCompleted');

//danh muc quang cao

Route::get('getloaiquangcao', 'LoaiQuangCaoController@getloaiquangcao');
Route::post('themloaiquangcao', 'LoaiQuangCaoController@themloaiquangcao');
Route::post('capnhatloaiquangcao/{id}', 'LoaiQuangCaoController@capnhatloaiquangcao');
Route::get('xoaloaiquangcao/{id}', 'LoaiQuangCaoController@xoaloaiquangcao');
Route::get('getloaiquangcaotheoid/{id}', 'LoaiQuangCaoController@getloaiquangcaotheoid');

//cap do
Route::get('getcapdo', 'CapDoController@getcapdo');
Route::post('themcapdo', 'CapDoController@themcapdo');
Route::post('capnhatcapdo/{id}', 'CapDoController@capnhatcapdo');
Route::get('xoacapdo/{id}', 'CapDoController@xoacapdo');
Route::get('getcapdotheoid/{id}', 'CapDoController@getcapdotheoid');

//san pham quang cao

Route::get('getsanphamquangcao', 'SanPhamQuangCaoController@getsanphamquangcao');
Route::post('themsanphamquangcao', 'SanPhamQuangCaoController@themsanphamquangcao');
Route::post('capnhatsanphamquangcao/{id}', 'SanPhamQuangCaoController@capnhatsanphamquangcao');
Route::get('xoasanphamquangcao/{id}', 'SanPhamQuangCaoController@xoasanphamquangcao');
Route::get('getsanphamquangcaotheoid/{id}', 'SanPhamQuangCaoController@getsanphamquangcaotheoid');

//quang cao

Route::get('getquangcao', 'QuangcaoController@getquangcao');
Route::post('themquangcao', 'QuangcaoController@themquangcao');
Route::post('capnhatquangcao/{id}', 'QuangcaoController@capnhatquangcao');
Route::get('xoaquangcao/{id}', 'QuangcaoController@xoaquangcao');
Route::get('getquangcaotheoid/{id}', 'QuangcaoController@getquangcaotheoid');
Route::get('bieudochiphi', 'QuangcaoController@bieudochiphi');

//KPI

Route::get('getkpi', 'KPIQuangCaoController@index');
Route::post('themkpi', 'KPIQuangCaoController@store');
Route::post('capnhatkpi/{id}', 'KPIQuangCaoController@update');

//capdo

Route::get('doanhthutheokhachhang/{id}', 'KhachhangController@doanhthutheokhachhang');
Route::get('lichsutichluy/{id}', 'KhachhangController@lichsutichluy');
Route::get('taotientichluy', 'KhachhangController@taotientichluy');
Route::get('tientichluykhachhang/{id}', 'KhachhangController@tientichluykhachhang');

//lichsuchinhsua

Route::get('danhsachlichsuchinhsua', 'LichSuChinhSuaController@danhsachlichsuchinhsua');

//chi nhanh
Route::get('getchinhanh', 'ChiNhanhController@getchinhanh');
Route::post('themchinhanh', 'ChiNhanhController@themchinhanh');
Route::post('capnhatchinhanh/{id}', 'ChiNhanhController@capnhatchinhanh');
Route::get('xoachinhanh/{id}', 'ChiNhanhController@xoachinhanh');
Route::get('getchinhanhtheoid/{id}', 'ChiNhanhController@getchinhanhtheoid');

Route::post('khammoitheochinhanh/{id}', 'KhamMoiController@indextheochinhanh');


Route::get('danhsachtaikhoan', 'ApiController@danhSachTaiKhoan');
Route::post('taotaikhoan', 'ApiController@taoTaiKhoan');
Route::get('chitiettaikhoan/{id}', 'ApiController@infouser');
Route::post('updatetaikhoan/{id}', 'ApiController@updateTaiKhoan');
Route::get('danhsachtaikhoansale', 'ApiController@danhSachTaiKhoanSale');
Route::get('danhsachtaikhoansaleoffline', 'ApiController@danhSachTaiKhoanSaleOffline');
//role
Route::get('danhsachrole', 'RoleController@index');
Route::post('taorole', 'RoleController@store');
Route::get('chitietrole/{id}', 'RoleController@chitietrole');
Route::post('updaterole/{id}', 'RoleController@update');