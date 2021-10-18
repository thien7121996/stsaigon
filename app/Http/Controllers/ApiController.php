<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use App\User;
use Session;
class ApiController extends Controller
{

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_email_or_password',
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ]);
        }
        $user = User::where('email',$request->get('email'))->select("id")->first();
        $userrole = User::where('email',$request->get('email'))->select("role")->first();
        $userkhid = User::where('email',$request->get('email'))->select("idkh")->first();
        $userkhname = User::where('email',$request->get('email'))->select("name")->first();
        Session::put('userquantri', $userkhname);
        return response()->json([
            'response' => 'success',
            'result' => [
                'token' => $token,
                'iduser' => $user,
                'roleuser' => $userrole,
                'userkhid' => $userkhid,
                'userkhname' => $userkhname
            ],
        ]);
    }
    public function infouser($id)
    {
        $user = User::find($id);
        return $user->toJson();
    }
    public function danhSachTaiKhoan(Request $request)
    {
        $user = User::with('roles')->get();
        return $user->toJson();
    }
    public function danhSachTaiKhoanSale(Request $request)
    {
        $user = User::with('roles')->where('role',4)->get();
        return $user->toJson();
    }
    public function danhSachTaiKhoanSaleOffline(Request $request)
    {
        $user = User::with('roles')->where('role',5)->get();
        return $user->toJson();
    }
    public function taoTaiKhoan(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'role' => 'required',

          ]);
  
          $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => \Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'idkh' => '0',
            'remember_token' => str_random(10),
          ]);
     
      return response()->json('Project created!');
    }
    public function updateTaiKhoan(Request $request,$id)
    {
        $user = User::find($id);
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        if($request->get('password')!="")
        {
            $user->password = \Hash::make($request->get('password'));
        }
       
        $user->role = $request->get('role');
        $user->save();
     
      return response()->json('Đã cập nhật tài khoản');
    }
}