<?php

namespace App\Http\Controllers;
use App\Dieutritheolich;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Lichsuchinhsua;
class DieuTriTheoLichController extends Controller
{
    public function index($id)
    {
       
        $dieutritheolich = Dieutritheolich::join('dieutri', 'dieutritheolich.dieutri', '=', 'dieutri.id')->join('lichhen', 'dieutritheolich.idlich', '=', 'lichhen.id')->join('doctor', 'dieutritheolich.bacsi', '=', 'doctor.id')->select("dieutritheolich.*","dieutri.ten as tendieutri","doctor.ten as tenbacsi","lichhen.giohen as giohen","lichhen.start as start")->where("dieutritheolich.idkhammoi",'=',$id)->get();
        for($i=0;$i<count($dieutritheolich);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $dieutritheolich[$i]->luuy);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $dieutritheolich[$i]["ghichutext"]=$tongdoanvan;
        }               

        return $dieutritheolich->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngay' => 'required',
            'idlich' => 'required',
            'dieutri' => 'required',
            'bacsi' => 'required',
            'trangthai' => 'required',
            'luuy' => 'required',
            'idkhammoi' => 'required',
            'idkhachhang' => 'required'
          ]);
  
          $dieutritheolich = Dieutritheolich::create([
            'ngay' => $validatedData['ngay'],
            'idlich' => $validatedData['idlich'],
            'dieutri' => $validatedData['dieutri'],
            'bacsi' => $validatedData['bacsi'],
            'trangthai' => $validatedData['trangthai'],
            'luuy' => $validatedData['luuy'],
            'idkhammoi' => $validatedData['idkhammoi'],
            'idkhachhang' => $validatedData['idkhachhang'],
          ]);
          $lichsuchinhsua = Lichsuchinhsua::create([
            'noidungchinhsua' => "Tạo điều trị cho khách hàng",
            'idkhachhang' => $validatedData['idkhachhang'],
            'userchinhsua' => $request->cookie('userkhname')
          ]);  
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $dieutritheolich = Dieutritheolich::find($id);
        $dieutritheolich->ngay = $request->get('ngay');
        $dieutritheolich->idlich = $request->get('idlich');
        $dieutritheolich->dieutri = $request->get('dieutri');
        $dieutritheolich->bacsi = $request->get('bacsi');
        $dieutritheolich->trangthai = $request->get('trangthai');
        $dieutritheolich->luuy = $request->get('luuy');
        $dieutritheolich->idkhammoi = $request->get('idkhammoi');
        $dieutritheolich->idkhachhang = $request->get('idkhachhang');
        $dieutritheolich->save();
        $lichsuchinhsua = Lichsuchinhsua::create([
          'noidungchinhsua' => "Cập nhật điều trị cho khách hàng",
          'idkhachhang' => $request->get('idkhachhang'),
          'userchinhsua' => $request->cookie('userkhname')
        ]);  
        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $dieutritheolich = Dieutritheolich::find($id);
      $dieutritheolich->delete();
      
      return response()->json('Successfully Deleted');
    }
    public function chitietdieutritheolich($id)
    {
      $dieutritheolich = Dieutritheolich::join('lichhen', 'dieutritheolich.idlich', '=', 'lichhen.id')->where('dieutritheolich.id',$id)->select("dieutritheolich.*","lichhen.start as ngayhen","lichhen.giohen as giohen")->first();

      return $dieutritheolich->toJson();
    }
    public function laysoanh($id)
    {
      $dieutritheolich = Dieutritheolich::join('anhdieutri', 'anhdieutri.iddieutri', '=', 'dieutritheolich.id')->select( DB::raw(' count(anhdieutri.iddieutri) as soanh'))->where("anhdieutri.iddieutri",'=',$id)->get();
      return $dieutritheolich->toJson();
    }
}
