<?php

namespace App\Http\Controllers;
use App\Khachhang;
use App\Thanhtoankhachhang;
use App\Capdo;
use App\Lichsutichluy;
use App\Tientichluy;
use App\Lichsuchinhsua;
use App\Khammoi;
use App\Thoigianbieu;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

use Session;
class KhachhangController extends Controller
{
    public function index(Request $request)
    {
     
     
      $customer = DB::table('khachhang')->orderBy('ID', 'desc')->get();
     
      return $customer->toJson();
    }
    public function indexbyidbacsi($id)
    {
            
      $customer = DB::table('khachhang')->where("bacsidieutri",$id)->orderBy('ID', 'desc')->get();
     
      return $customer->toJson();
    }
    public function store(Request $request)
    {
      
      $path = 'uploads\customer';
      $imageName="";
      $imagetruocmatbefore="";      
      $imagehamduoibefore="";  
      $imagetruocmatafter="";  
      $imagehamtrenafter="";  
      $imagehamduoiafter="";  
      if ($request->anhdaidien){
        $image_64 =  $request->anhdaidien;
        
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $image = str_replace($replace, '', $image_64); 
      
       $image = str_replace(' ', '+', $image); 
      
       $imageName = "anhdaidien-".str_random(10).'.'.$extension;
        \File::put(public_path(). '/uploads/customer/' .$imageName, base64_decode($image));        
      }
      else
      {
        $imageName="nonuser.jpg";
      }
      if ($request->hamduoi){
        $image_64hd =  $request->hamduoi;
        
        $extensionhd = explode('/', explode(':', substr($image_64hd, 0, strpos($image_64hd, ';')))[1])[1];   // .jpg .png .pdf

        $replacehd = substr($image_64hd, 0, strpos($image_64hd, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehd = str_replace($replacehd, '', $image_64hd); 
      
       $imagehd = str_replace(' ', '+', $imagehd); 
      
       $imageNamehd ="hamduoi-".str_random(10).'.'.$extensionhd;
        \File::put(public_path(). '/uploads/customer/' . $imageNamehd, base64_decode($imagehd));        
      }
      else
      {
        $imageNamehd="nonuser.jpg";
      }
        // UP ẢNH TRƯỚC MẶT BEFORE
        if ($request->truocmatbefore){
          $image_64tmbf =  $request->truocmatbefore;
          
          $extensiontmbf = explode('/', explode(':', substr($image_64tmbf, 0, strpos($image_64tmbf, ';')))[1])[1];   // .jpg .png .pdf
  
          $replacetmbf = substr($image_64tmbf, 0, strpos($image_64tmbf, ',')+1); 
        
        // find substring fro replace here eg: data:image/png;base64,
        
         $imagetmbf = str_replace($replacetmbf, '', $image_64tmbf); 
        
         $imagetmbf = str_replace(' ', '+', $imagetmbf); 
        
         $imagetruocmatbefore ="hamtren-".str_random(10).'.'.$extensiontmbf;
          \File::put(public_path(). '/uploads/customer/' .$imagetruocmatbefore , base64_decode($imagetmbf));        
        }
        else
        {
          $imagetruocmatbefore ="nonuser.jpg";
        }
      // UP ẢNH HÀM TRÊN BEFORE
      if ($request->hamtrenbefore){
        $image_64htbf =  $request->hamtrenbefore;
        
        $extensionhtbf = explode('/', explode(':', substr($image_64htbf, 0, strpos($image_64htbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtbf = substr($image_64htbf, 0, strpos($image_64htbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtbf = str_replace($replacehtbf, '', $image_64htbf); 
      
       $imagehtbf = str_replace(' ', '+', $imagehtbf); 
      
       $imagehamtrenbefore ="hamtren-".str_random(10).'.'.$extensionhtbf;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenbefore, base64_decode($imagehtbf));        
      }
      else
      {
        $imagehamtrenbefore="nonuser.jpg";
      }
      // UP ẢNH HÀM DƯỚI BEFORE
      if ($request->hamduoibefore){
        $image_64hdbf =  $request->hamduoibefore;
        
        $extensionhdbf = explode('/', explode(':', substr($image_64hdbf, 0, strpos($image_64hdbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacehdbf = substr($image_64htbf, 0, strpos($image_64hdbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehdbf = str_replace($replacehdbf, '', $image_64hdbf); 
      
       $imagehdbf = str_replace(' ', '+', $imagehdbf); 
      
       $imagehamduoibefore ="hamtren-".str_random(10).'.'.$extensionhdbf;
        \File::put(public_path(). '/uploads/customer/' .$imagehamduoibefore , base64_decode($imagehdbf));        
      }
      else
      {
        $imagehamduoibefore ="nonuser.jpg";
      }
      // UP ẢNH TRƯỚC MẶT AFTER
      if ($request->truocmatafter){
        $image_64tmat =  $request->truocmatafter;
        
        $extensiontmat = explode('/', explode(':', substr($image_64tmat, 0, strpos($image_64tmat, ';')))[1])[1];   // .jpg .png .pdf

        $replacetmat = substr($image_64tmat, 0, strpos($image_64tmat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagetmat = str_replace($replacetmat, '', $image_64tmat); 
      
       $imagetmat = str_replace(' ', '+', $imagetmat); 
      
       $imagetruocmatafter ="hamtren-".str_random(10).'.'.$extensiontmat;
        \File::put(public_path(). '/uploads/customer/' .$imagetruocmatafter , base64_decode($imagetmat));        
      }
      else
      {
        $imagetruocmatafter ="nonuser.jpg";
      }
      // UP ẢNH HÀM TRÊN AFTER
      if ($request->hamtrenafter){
        $image_64htat =  $request->hamtrenafter;
        
        $extensionhtat = explode('/', explode(':', substr($image_64htat, 0, strpos($image_64htat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtat = substr($image_64htat, 0, strpos($image_64htat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtat = str_replace($replacehtat, '', $image_64htat); 
      
       $imagehtat = str_replace(' ', '+', $imagehtat); 
      
       $imagehamtrenafter ="hamtren-".str_random(10).'.'.$extensionhtat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenafter , base64_decode($imagehtat));        
      }
      else
      {
        $imagehamtrenafter ="nonuser.jpg";
      }
      // UP ẢNH HÀM DƯỚI AFTER
      if ($request->hamduoiafter){
        $image_64hdat =  $request->hamduoiafter;
        
        $extensionhdat = explode('/', explode(':', substr($image_64hdat, 0, strpos($image_64hdat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehdat = substr($image_64hdat, 0, strpos($image_64hdat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehdat = str_replace($replacehdat, '', $image_64hdat); 
      
       $imagehdat = str_replace(' ', '+', $imagehdat); 
      
       $imagehamduoiafter ="hamtren-".str_random(10).'.'.$extensionhdat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamduoiafter , base64_decode($imagehdat));        
      }
      else
      {
        $imagehamduoiafter ="nonuser.jpg";
      }
      $hoten = $request->hoten;
      $gioitinh = $request->gioitinh;
      $ngaysinh = $request->ngaysinh;
      $diachi = $request->diachi;
      $dienthoai = $request->dienthoai;
      $tiensubenh = $request->tiensubenh;
      $gioithieu = $request->gioithieu;
      $dichvudieutri = $request->dichvudieutri;
      $nguongioithieu = $request->nguongioithieu;
      $danhgia = $request->danhgia;
      $sosao = $request->sosao;
      $bacsidieutri = $request->bacsidieutri;
      $trangthai = $request->trangthai;
      $khuvuc = $request->khuvuc;
      $customer =  DB::table('khachhang')->insertGetId([
        'hoten' => $hoten,
        'gioitinh' => $gioitinh,
        'ngaysinh' => $ngaysinh,
        'diachi' => $diachi,
        'dienthoai' => $dienthoai,
        'tiensubenh' => json_encode($tiensubenh),
        'gioithieu' => $gioithieu,
        'khuvuc' => $khuvuc,
        'dichvudieutri' => json_encode($dichvudieutri),
        'nguongioithieu' => json_encode($nguongioithieu),
        'anhdaidien' => $imageName,
        'truocmatbefore' => $imagetruocmatbefore,
        'hamtrenbefore' => $imagehamtrenbefore,
        'hamduoibefore' =>$imagehamduoibefore,
        'truocmatafter' => $imagetruocmatafter,
        'hamtrenafter' => $imagehamtrenafter,
        'hamduoiafter' =>$imagehamduoiafter,
        'danhgia' => $danhgia,
        'sosao' => $sosao,
        'bacsidieutri' => $bacsidieutri,
        'trangthai' => $trangthai
      ]);
      
    
      
      $thanhtoan = Tientichluy::create([
        'tientichluy' => 0,
        'idkhachhang' => $customer
      ]);
     
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Tạo khách hàng mới có ID ".$customer,
        'idkhachhang' => $customer,
        'userchinhsua' => $request->cookie('userkhname')
      ]);    
    return response()->json($customer);
    }
    public function update(Request $request, $id)
    {
      $path = 'uploads\customer';
      
      $imageNameNew= $request->get('anhdaidien');
      if(strpos($imageNameNew, 'anhdaidien-') !== false || strpos($imageNameNew, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64 =  $request->get('anhdaidien');
        
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',')+1); 
      
       $image = str_replace($replace, '', $image_64); 
      
       $image = str_replace(' ', '+', $image); 
      
       $imageNameNew = "anhdaidien-".str_random(10).'.'.$extension;
        \File::put(public_path(). '/uploads/customer/' .$imageNameNew, base64_decode($image));  
      }
      
      $imagetruocmatbefore= $request->get('truocmatbefore');      
      if(strpos($imagetruocmatbefore, 'hamtren-') !== false || strpos($imagetruocmatbefore, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64tmbf =  $request->get('truocmatbefore');
          
        $extensiontmbf = explode('/', explode(':', substr($image_64tmbf, 0, strpos($image_64tmbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacetmbf = substr($image_64tmbf, 0, strpos($image_64tmbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagetmbf = str_replace($replacetmbf, '', $image_64tmbf); 
      
       $imagetmbf = str_replace(' ', '+', $imagetmbf); 
      
       $imagetruocmatbefore ="hamtren-".str_random(10).'.'.$extensiontmbf;
        \File::put(public_path(). '/uploads/customer/' .$imagetruocmatbefore , base64_decode($imagetmbf));  
      }
      
      $imagehamduoibefore = $request->get('hamduoibefore');
      if(strpos($imagehamduoibefore, 'hamduoi-') !== false || strpos($imagehamduoibefore, 'hamtren-') !== false  || strpos($imagehamduoibefore, 'nonuser') !== false) { 
        
      }
      else
      {
         $image_64hd =  $request->get('hamduoibefore');
            
         $extensionhd = explode('/', explode(':', substr($image_64hd, 0, strpos($image_64hd, ';')))[1])[1];   // .jpg .png .pdf

         $replacehd = substr($image_64hd, 0, strpos($image_64hd, ',')+1); 
          
          // find substring fro replace here eg: data:image/png;base64,
          
          $imagehd = str_replace($replacehd, '', $image_64hd); 
          
          $imagehd = str_replace(' ', '+', $imagehd); 
          
          $imagehamduoibefore ="hamduoi-".str_random(10).'.'.$extensionhd;
            \File::put(public_path(). '/uploads/customer/' . $imagehamduoibefore, base64_decode($imagehd));  
      }

      $imagehamtrenbefore = $request->get('hamtrenbefore');
      if(strpos($imagehamtrenbefore, 'hamtren-') !== false || strpos($imagehamtrenbefore, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64htbf =  $request->get('hamtrenbefore');
        
        $extensionhtbf = explode('/', explode(':', substr($image_64htbf, 0, strpos($image_64htbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtbf = substr($image_64htbf, 0, strpos($image_64htbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtbf = str_replace($replacehtbf, '', $image_64htbf); 
      
       $imagehtbf = str_replace(' ', '+', $imagehtbf); 
      
       $imagehamtrenbefore ="hamtren-".str_random(10).'.'.$extensionhtbf;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenbefore, base64_decode($imagehtbf)); 
      }
      $imagetruocmatafter= $request->get('truocmatafter'); 
      if(strpos($imagetruocmatafter, 'hamtren-') !== false || strpos($imagetruocmatafter, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64tmat = $request->get('truocmatafter'); 
        
        $extensiontmat = explode('/', explode(':', substr($image_64tmat, 0, strpos($image_64tmat, ';')))[1])[1];   // .jpg .png .pdf

        $replacetmat = substr($image_64tmat, 0, strpos($image_64tmat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagetmat = str_replace($replacetmat, '', $image_64tmat); 
      
       $imagetmat = str_replace(' ', '+', $imagetmat); 
      
       $imagetruocmatafter ="hamtren-".str_random(10).'.'.$extensiontmat;
        \File::put(public_path(). '/uploads/customer/' .$imagetruocmatafter , base64_decode($imagetmat));
      }
      $imagehamtrenafter= $request->get('hamtrenafter');
      if(strpos($imagehamtrenafter, 'hamtren-') !== false || strpos($imagehamtrenafter, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64htat =  $request->get('hamtrenafter');
        
        $extensionhtat = explode('/', explode(':', substr($image_64htat, 0, strpos($image_64htat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtat = substr($image_64htat, 0, strpos($image_64htat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtat = str_replace($replacehtat, '', $image_64htat); 
      
       $imagehtat = str_replace(' ', '+', $imagehtat); 
      
       $imagehamtrenafter ="hamtren-".str_random(10).'.'.$extensionhtat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenafter , base64_decode($imagehtat));    
      }
      $imagehamduoiafter= $request->get('hamduoiafter');  
      if(strpos($imagehamduoiafter, 'hamtren-') !== false || strpos($imagehamduoiafter, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64hdat =  $request->get('hamduoiafter');
        
        $extensionhdat = explode('/', explode(':', substr($image_64hdat, 0, strpos($image_64hdat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehdat = substr($image_64hdat, 0, strpos($image_64hdat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehdat = str_replace($replacehdat, '', $image_64hdat); 
      
       $imagehdat = str_replace(' ', '+', $imagehdat); 
      
       $imagehamduoiafter ="hamtren-".str_random(10).'.'.$extensionhdat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamduoiafter , base64_decode($imagehdat));    
      }
      $imageName = $imageNameNew;
      $customer = Khachhang::find($id);
      DB::table('khachhang')
            ->where('ID', $id)
            ->update([
             'hoten' => $request->get('hoten'),
             'gioitinh' => $request->get('gioitinh'),
             'ngaysinh' => $request->get('ngaysinh'),
             'diachi' => $request->get('diachi'),
             'dienthoai' => $request->get('dienthoai'),
             'tiensubenh' => json_encode($request->get('tiensubenh')),
             'gioithieu' => $request->get('gioithieu'),
             'khuvuc' => $request->get('khuvuc'),
             'dichvudieutri' => json_encode($request->get('dichvudieutri')),
             'nguongioithieu' => json_encode($request->get('nguongioithieu')),
             'anhdaidien' => $imageName,
             'truocmatbefore' => $imagetruocmatbefore,
             'hamtrenbefore' => $imagehamtrenbefore,
             'hamduoibefore' => $imagehamduoibefore,
             'truocmatafter' => $imagetruocmatafter,
             'hamtrenafter' => $imagehamtrenafter,
             'hamduoiafter' => $imagehamduoiafter,
             'danhgia' => $request->get('danhgia'),
             'sosao' => $request->get('sosao'),
             'bacsidieutri' => $request->get('bacsidieutri'),
             'trangthai' => $request->get('trangthai')
             ]);
     
     
             $lichsuchinhsua = Lichsuchinhsua::create([
              'noidungchinhsua' => "Cập nhật khách hàng mới có ID ".$id,
              'idkhachhang' => $id,
              'userchinhsua' => $request->cookie('userkhname')
            ]); 
      return response()->json($customer);
      
    }
    public function xoakhachhang(Request $request,$id)
    {
      $customer = Khachhang::where('ID',$id);
      $customertim = Khachhang::where('ID',$id)->first();
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Xóa khách hàng có tên là ".$customertim->hoten,
        'idkhachhang' => $id,
        'userchinhsua' => $request->cookie('userkhname')
      ]); 
      $customer->delete();
      $khammoi = Khammoi::where('idkhachhang',$id);
      $khammoi->delete();
      $thoigianbieu = Thoigianbieu::where('idkhachhang',$id);
      $thoigianbieu->delete(); 
      $thanhtoan = Thanhtoankhachhang::where('idkhachhang',$id);
      $thanhtoan->delete(); 
      return response()->json('Xóa thành công');
    }
    public function chitietkhachhang($id)
    {
      $customer = Khachhang::where('ID',$id)->first();
     
          $tongdoanvan=[];
          $paragraphs = explode("\n", $customer->gioithieu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $customer["ghichutext"]=$tongdoanvan;
    
      return $customer->toJson();
    }
    public static function bolockhachhangs(Request $request)
    {
      $param = $request->all();
    
      $customers = Khachhang::join('lichhen', 'lichhen.idkhachhang', '=', 'khachhang.ID')
      ->select([
          'khachhang.ID',
          'khachhang.hoten',
          'khachhang.gioitinh',
          'khachhang.ngaysinh',
          'khachhang.diachi',
          'khachhang.dienthoai',
          'khachhang.tiensubenh',
          'khachhang.gioithieu',
          'khachhang.dichvudieutri',
          'khachhang.nguongioithieu',
          'khachhang.anhdaidien',
          'khachhang.danhgia',
          'khachhang.sosao',
          'khachhang.bacsidieutri',
          'khachhang.trangthai',
          DB::raw('GROUP_CONCAT(DISTINCT lichhen.start, "") AS lichhenkh')
          
      ])

      ->groupBy('khachhang.hoten')
      ->groupBy('khachhang.gioitinh')
      ->groupBy('khachhang.ngaysinh')
      ->groupBy('khachhang.diachi')
      ->groupBy('khachhang.dienthoai')
      ->groupBy('khachhang.tiensubenh')
      ->groupBy('khachhang.gioithieu')
      ->groupBy('khachhang.dichvudieutri')
      ->groupBy('khachhang.nguongioithieu')
      ->groupBy('khachhang.anhdaidien')
      ->groupBy('khachhang.danhgia')
      ->groupBy('khachhang.sosao')
      ->groupBy('khachhang.bacsidieutri')
      ->groupBy('khachhang.trangthai')
      ->groupBy('khachhang.ID');
       return $customers->get()->toJson();
        
    }
       
    public static function bolockhachhang(Request $request)
    {
      $param = $request->all();
      $khachhang = Khachhang::filter($param);
  
    
       return $khachhang->get()->toJson();
        
    }
    public static function bolocdoanhthukh(Request $request)
    {
      $param = $request->all();
      $khachhang = Khachhang::boloc($param);
  
    
       return $khachhang->get()->toJson();
        
    }
    public static function bolocdoanhthukhtheothang(Request $request,$id)
    {
      $param = $request->all();
      $khachhang = Khachhang::boloctheothang($param,$id);
  
    
       return $khachhang->get()->toJson();
        
    }
    public function tongkhachhang()
    {
        $sokhachhang = Khachhang::select(DB::raw('count(id) AS soluongkhachhang'))->get();
       
        $sokhachhang = $sokhachhang[0]["soluongkhachhang"];
        return $sokhachhang;
        
    }
    public function laytienkhtong(){
        $customers = Khachhang::join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
        ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->leftjoin("doctor","doctor.id","=","khachhang.bacsidieutri")
  
        ->select([
            'khachhang.ID',
            'khachhang.hoten',
            'khachhang.gioitinh',
            'khachhang.ngaysinh',
            'khachhang.diachi',
            'khachhang.dienthoai',
            'khachhang.tiensubenh',
            'khachhang.gioithieu',
            'khachhang.dichvudieutri',
            'khachhang.nguongioithieu',
            'khachhang.anhdaidien',
            'khachhang.danhgia',
            'khachhang.sosao',
            'khachhang.bacsidieutri',
            'khachhang.trangthai',
            'doctor.ten as tenbacsi',
            DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
           
          
         
            
            
        ])
        ->groupBy('khachhang.ID')
        ->groupBy('khachhang.hoten')
        ->groupBy('khachhang.gioitinh')
        ->groupBy('khachhang.ngaysinh')
        ->groupBy('khachhang.diachi')
        ->groupBy('khachhang.dienthoai')
        ->groupBy('khachhang.tiensubenh')
        ->groupBy('khachhang.gioithieu')
        ->groupBy('khachhang.dichvudieutri')
        ->groupBy('khachhang.nguongioithieu')
        ->groupBy('khachhang.anhdaidien')
        ->groupBy('khachhang.danhgia')
        ->groupBy('khachhang.sosao')
        ->groupBy('khachhang.bacsidieutri')
        ->groupBy('khachhang.trangthai')
        ->groupBy('doctor.ten')
        ->orderBy('khachhang.ID', 'desc');
         return $customers->get()->toJson();
    }
    public function laytienkhdatt(){
      $customers = Khachhang::join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')


      ->select([
          'khachhang.ID',
          'khachhang.hoten',
          'khachhang.gioitinh',
          'khachhang.ngaysinh',
          'khachhang.diachi',
          'khachhang.dienthoai',
          'khachhang.tiensubenh',
          'khachhang.gioithieu',
          'khachhang.dichvudieutri',
          'khachhang.nguongioithieu',
          'khachhang.anhdaidien',
          'khachhang.danhgia',
          'khachhang.sosao',
          'khachhang.bacsidieutri',
          'khachhang.trangthai',
        
          DB::raw('SUM(thanhtoankhachhang.tongtien) as tongtiendatra'),
        
       
          
          
      ])
      ->groupBy('khachhang.ID')
      ->groupBy('khachhang.hoten')
      ->groupBy('khachhang.gioitinh')
      ->groupBy('khachhang.ngaysinh')
      ->groupBy('khachhang.diachi')
      ->groupBy('khachhang.dienthoai')
      ->groupBy('khachhang.tiensubenh')
      ->groupBy('khachhang.gioithieu')
      ->groupBy('khachhang.dichvudieutri')
      ->groupBy('khachhang.nguongioithieu')
      ->groupBy('khachhang.anhdaidien')
      ->groupBy('khachhang.danhgia')
      ->groupBy('khachhang.sosao')
      ->groupBy('khachhang.bacsidieutri')
      ->groupBy('khachhang.trangthai')
      ->orderBy('khachhang.ID', 'desc');
       return $customers->get()->toJson();
  }
  public function laytienkhtongtheothang($id){
    $customers = Khachhang::join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
    ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')

    ->select([
        'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
        DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
       
      
     
        
        
    ])
    ->whereMonth('thanhtoankhachhang.created_at', '=', $id)
    ->groupBy('khachhang.ID')
    ->groupBy('khachhang.hoten')
    ->groupBy('khachhang.gioitinh')
    ->groupBy('khachhang.ngaysinh')
    ->groupBy('khachhang.diachi')
    ->groupBy('khachhang.dienthoai')
    ->groupBy('khachhang.tiensubenh')
    ->groupBy('khachhang.gioithieu')
    ->groupBy('khachhang.dichvudieutri')
    ->groupBy('khachhang.nguongioithieu')
    ->groupBy('khachhang.anhdaidien')
    ->groupBy('khachhang.danhgia')
    ->groupBy('khachhang.sosao')
    ->groupBy('khachhang.bacsidieutri')
    ->groupBy('khachhang.trangthai')
    ->orderBy('khachhang.ID', 'desc');
     return $customers->get()->toJson();
}
  public function laytienkhdatttheothang($id){
    $customers = Khachhang::join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')


    ->select([
        'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
      
        DB::raw('SUM(thanhtoankhachhang.tongtien) as tongtiendatra'),
      
     
        
        
    ])
    ->whereMonth('thanhtoankhachhang.created_at', '=', $id)
    ->groupBy('khachhang.ID')
    ->groupBy('khachhang.hoten')
    ->groupBy('khachhang.gioitinh')
    ->groupBy('khachhang.ngaysinh')
    ->groupBy('khachhang.diachi')
    ->groupBy('khachhang.dienthoai')
    ->groupBy('khachhang.tiensubenh')
    ->groupBy('khachhang.gioithieu')
    ->groupBy('khachhang.dichvudieutri')
    ->groupBy('khachhang.nguongioithieu')
    ->groupBy('khachhang.anhdaidien')
    ->groupBy('khachhang.danhgia')
    ->groupBy('khachhang.sosao')
    ->groupBy('khachhang.bacsidieutri')
    ->groupBy('khachhang.trangthai')
    ->orderBy('khachhang.ID', 'desc');
     return $customers->get()->toJson();
}
public function tongkhachhangtheothang($id)
{
    $sokhachhang = Khachhang::select(DB::raw('count(id) AS soluongkhachhang'))->whereMonth('created_at', '=', $id)->get();
   
    $sokhachhang = $sokhachhang[0]["soluongkhachhang"];
    return $sokhachhang;
    
}
public function doanhthutheokhachhang($id)
{
  $tichluy = Lichsutichluy::where('khachhanggioithieu',$id)->sum('tienthanhtoan');
  $doanhthu = Thanhtoankhachhang::where('idkhachhang',$id)->sum('tongtien');
  $tientichluy = Tientichluy::where('idkhachhang',$id)->first();
  $capdo = Capdo::orderBy('sotiencapdo', 'asc')->get();
  
  $dd=count($capdo);
  $i=0;
  $sotientichluy=0;
  $sotienhoahong=0;
 $capdothanhvien=[];
 $capdothanhvien[0]['sotientichluy']=0;
        $capdothanhvien[0]['tencapdo']= "Khách hàng lần đầu";
        $capdothanhvien[0]['doanhthukhachhang']=0;
        $capdothanhvien[0]['sotienhoahong']=0;
        $capdothanhvien[0]['phantram']=0;
  foreach ($capdo as $cd) {
    if($doanhthu>=$cd->sotiencapdo)
    {
        $tencapdo=$cd->tencapdo;
        $sotientichluy=$doanhthu*(($cd->phantram)/100);
        $sotienhoahong=$tichluy*(($cd->phantram)/100);
        $capdothanhvien=[];

        $capdothanhvien[0]['sotientichluy']=number_format($sotientichluy,0,",",".");
        $capdothanhvien[0]['tencapdo']= $cd->tencapdo;
        $capdothanhvien[0]['doanhthukhachhang']=number_format($doanhthu,0,",",".");
        $capdothanhvien[0]['sotienhoahong']=number_format($sotienhoahong,0,",",".");
        $capdothanhvien[0]['phantram']=$cd->phantram;
      }
    
  }
 
    return  $capdothanhvien;
  

}
public function lichsutichluy($id)
{

  $lichsutichluy = Lichsutichluy::with('khachhangs')->where('khachhanggioithieu',$id)->get();
  return $lichsutichluy->toJson();
}
public function timcapdo($tien)
{
  $capdo = Capdo::orderBy('sotiencapdo', 'asc')->get();
  $phantram = 5;
  foreach ($capdo as $cd) {
    if($tien>=$cd->sotiencapdo)
    {
        $phantram=$cd->phantram;
        
    }
    
  }
  return $phantram;
}
public function tientichluykhachhang(Request $request,$id)
{
  $tientichluy = Tientichluy::where('idkhachhang',$id)->get();
  
  return $tientichluy->toJson();
}
public function taotientichluy(Request $request)
{
  $customer = DB::table('khachhang')->get();
  foreach($customer as $ct)
  {
    $tichluy = Lichsutichluy::where('khachhanggioithieu',$ct->ID)->sum('tienthanhtoan');
    $doanhthu = Thanhtoankhachhang::where('idkhachhang',$ct->ID)->sum('tongtien');
    $sotientichluy=$doanhthu*($this->timcapdo($doanhthu)/100);
    $sotienhoahong=$tichluy*($this->timcapdo($doanhthu)/100);
    $thanhtoan = Tientichluy::create([
      'tientichluy' => $sotientichluy+$sotienhoahong,
      'idkhachhang' => $ct->ID
    ]);
  }
 
  return response()->json('Tạo thành công');
  

}
}
