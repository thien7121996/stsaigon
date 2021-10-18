<?php

namespace App\Http\Controllers;
use App\Khammoi;
use App\Chiphi;
use App\Thanhtoankhachhang;
use App\Thoigianbieu;
use App\Dieutritheolich;
use App\Lichsuchinhsua;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KhamMoiController extends Controller
{
    public function index($id)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where("idkhachhang",'=',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        
        for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
        }
    

        return $khammoi->toJson();
    }
    public function indexnosame($id)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->where("idkhachhang",'=',$id)->distinct()->orderBy('khammoi.created_at', 'DESC')->get();
        return $khammoi->toJson();
    }
    public function getallkhammoi()
    {
        $khammoitong=[];
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->orderBy('khammoi.created_at', 'DESC')->get();
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*0.1;
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
             
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoitheobacsi($id)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.bacsi',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        $khammoitong=[];
        
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*0.1;
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
             
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngay' => 'required',
            'nguon' => 'required',
            'benhly' => 'required',
            'dichvu' => 'required',
            'ghichu' => 'required',
            'bacsi' => 'required',
            'chiphi' => 'required',
            'thanhtoan' => 'required',
            'trangthaidieutri' => 'required',
            'idkhachhang' => 'required'
          ]);
  
          $khammoi = Khammoi::create([
            'ngay' => $validatedData['ngay'],
            'nguon' => $validatedData['nguon'],
            'benhly' => json_encode($validatedData['benhly']),
            'dichvu' => $validatedData['dichvu'],
            'ghichu' => $validatedData['ghichu'],
            'bacsi' => $validatedData['bacsi'],
            'chiphi' => $validatedData['chiphi'],
            'thanhtoan' => $validatedData['thanhtoan'],
            'trangthaidieutri' => $validatedData['trangthaidieutri'],
            'idkhachhang' => $validatedData['idkhachhang']
          ]);
          $lichsuchinhsua = Lichsuchinhsua::create([
            'noidungchinhsua' => "Tạo khám mới có ID là ".$khammoi->id,
            'idkhachhang' => $validatedData['idkhachhang'],
            'userchinhsua' => $request->cookie('userkhname')
          ]);      
      return response()->json($khammoi);
    }
    public function update(Request $request, $id)
    {
        $khammoi = Khammoi::find($id);
        $khammoi->ngay = $request->get('ngay');
        $khammoi->nguon = $request->get('nguon');
        $khammoi->benhly = json_encode($request->get('benhly'));
        $khammoi->dichvu = $request->get('dichvu');
        $khammoi->ghichu = $request->get('ghichu');
        $khammoi->bacsi = $request->get('bacsi');
        $khammoi->chiphi = $request->get('chiphi');
        $khammoi->thanhtoan = $request->get('thanhtoan');
        $khammoi->trangthaidieutri = $request->get('trangthaidieutri');
        $khammoi->idkhachhang = $request->get('idkhachhang');
        $khammoi->save();
        $lichsuchinhsua = Lichsuchinhsua::create([
          'noidungchinhsua' => "Chỉnh sửa khám mới có ID là ".$id,
          'idkhachhang' => $request->get('idkhachhang'),
          'userchinhsua' => $request->cookie('userkhname')
        ]);  
        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $khammoi = Khammoi::find($id);
      
      $khammoi->delete();
      $thanhtoan = Thanhtoankhachhang::where('idkhammoi',$id)->delete();
      $chiphi = Chiphi::where('idkhammoi',$id)->delete();
      $dieutri = Dieutritheolich::where('idkhammoi',$id)->delete();
      $lichhen = Thoigianbieu::where('idkhammoi',$id)->delete();
      return response()->json('Successfully Deleted');
    }
    public function chitietkhammoi($id)
    {
      $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.id',$id)->first();

      return $khammoi->toJson();
    }
    public function chitietkhammoikhachhang($id)
    {
      $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.idkhachhang',$id)->latest('created_at')->first();

      return $khammoi->toJson();
    }
    public function laysoanh($id)
    {
      $khammoi = DB::table('anhlichhen')->select( DB::raw(' count(idkhammoi) as soanh'))->where("idkhammoi",'=',$id)->get();
      return $khammoi->toJson();
    }
    public function getallkhammoitrongngay()
    {
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::with('khachhang')->with(['khammoi' => function($query){
          $query->with('bacsis')->with('dichvus');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoibacsi($id)
    {
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::whereHas('khammoi', function($query) use ($id) {
          $query->where('bacsi', $id);
       })->with('khachhang')->with(['khammoi' => function($query){
          $query->with('bacsis')->with('dichvus');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
}
