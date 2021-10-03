<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout realizado com sucesso',
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([
                'status' => 'success',
                'message' => 'Login realizado com sucesso',
                'user' => auth()->user()
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Usuário ou senha incorretos.',
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $inputs = $request->validated();

        $inputs['password'] = Hash::make($inputs['password']);

        if( !User::create($inputs)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao se registrar, tente novamente.',
            ]);
        };

        return $this->login($request);
    }



}