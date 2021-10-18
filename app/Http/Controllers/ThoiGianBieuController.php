<?php

namespace App\Http\Controllers;
use App\Thoigianbieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ThoiGianBieuController extends Controller
{
    public function index()
    {
      $thoigianbieu = DB::table('lichhen')->distinct()->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
      ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
      ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')
      ->orderBy('lichhen.start', 'desc')->get();
                                 

        return $thoigianbieu->toJson();
    }
    public function indextheothang($month)
    {
      $thoigianbieu = Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with('benhlys')
      ->with('khammois')
      ->where('start','LIKE','2021-'.$month.'%')
      
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
      $tongthoigianbieu=[];
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            $tongthoigianbieu[]=$thoigianbieu[$i];
			$tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
        }
      } 
        return $tongthoigianbieu;
    }
    public function store(Request $request)
    {
      $date = strtotime($request->start);
     
          $thoigianbieu = Thoigianbieu::create([
            'idkhachhang' => $request->idkhachhang,
            'dichvu' => $request->dichvu,
            'trangthai' => $request->trangthai,
            'ghichu' => $request->ghichu,
            'loai' => $request->loai,
            'dieutri' => $request->dieutri,
            'benhly' => $request->benhly,
            'idkhammoi' => $request->idkhammoi,
            'start' => date('Y-m-d h:i:s', $date),
            'end' => date('Y-m-d h:i:s', $date),
            'giohen' => $request->giohen,
            'idbacsi' => $request->idbacsi,
          ]);
      return $thoigianbieu->id;
    }
    public function lichlamviecchitiet($id)
    {
      $thoigianbieu = Thoigianbieu::find($id);
      return $thoigianbieu->toJson();
    }
    public function lichlamvieckhachhang($id)
    {
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->select('lichhen.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu')->where("lichhen.idkhachhang",'=',$id)->get();
     
      return $tongthoigianbieu->toJson();
    }
    public function update(Request $request, $id)
    {
      $date = strtotime($request->get('start'));
      
        $thoigianbieu = Thoigianbieu::find($id);
        $thoigianbieu->idkhachhang = $request->get('idkhachhang');
        $thoigianbieu->dichvu = $request->get('dichvu');
        $thoigianbieu->trangthai = $request->get('trangthai');
        $thoigianbieu->ghichu = $request->get('ghichu');
        $thoigianbieu->loai = $request->get('loai');
        $thoigianbieu->dieutri = $request->get('dieutri');
        $thoigianbieu->benhly = $request->get('benhly');
        $thoigianbieu->idkhammoi = $request->get('idkhammoi');
        $thoigianbieu->start =  date('Y-m-d h:i:s', $date);
        $thoigianbieu->end = date('Y-m-d h:i:s', $date);
        $thoigianbieu->giohen = $request->get('giohen');
        $thoigianbieu->idbacsi = $request->get('idbacsi');
        $thoigianbieu->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $thoigianbieu = Thoigianbieu::find($id);
      $thoigianbieu->delete();

      return response()->json('Successfully Deleted');
    }
    public function lichtheokh($id)
    {
      
     
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')->select('lichhen.*','doctor.ten AS tenbacsi')->where("idkhachhang",'=',$id)->get();
      return $thoigianbieu->toJson();
    }
    public function lichhendieutri($id)
    {
      
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
      ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')
      ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','chandoancacloai.ten AS tenbenhly')->where("dieutri",'=',$id)->get();
      return $thoigianbieu->toJson();
    }
    public function laytenkhtheobacsi($id)
    {
      
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
      ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
      ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->distinct('khachhang.hoten')->select('khachhang.hoten AS tenkhachhang')->where('lichhen.idbacsi',$id)->orderBy('lichhen.start', 'desc')->orderBy('lichhen.giohen', 'desc')->get();
                                 

        return $thoigianbieu->toJson();
    }
    public function lichhendieutritheoid($id)
    {
      
      $thoigianbieu = DB::table('lichhen')->where("id",'=',$id)->get();
      return $thoigianbieu->toJson();
    }
    public function lichhentheobacsi($id)
    {
      $thoigianbieu =Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with('benhlys')
      ->with('khammois')
      ->where('start','LIKE','2021-'.date('m').'%')
      ->where('idbacsi',$id)
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
      $tgb=[];
        for($i=0;$i<count($thoigianbieu);$i++)
        {
            if($thoigianbieu[$i]['khachhangs']!=null)
            {
              $tgb[]=$thoigianbieu[$i];
            }
        }                         

        return $tgb;
    }
    public static function boloclichhen(Request $request)
    {
      $param = $request->all();
      $lichhen = Thoigianbieu::boloc($param);
       return $lichhen->get()->toJson();
        
    }
    public static function testlichhen()
    {
      $startTime = date("Y-m-d H:i:s","01/01/2021");
    
      $lichhen = Thoigianbieu::join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
        ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
    ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')
    ->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')->where(DB::raw("(DATE_FORMAT(start,'%Y-%m-%d'))"), '>', $startTime)->where(DB::raw("(DATE_FORMAT(start,'%Y-%m-%d'))"), '<', $startTime);
  return $lichhen->toJson(); 
  }
}
