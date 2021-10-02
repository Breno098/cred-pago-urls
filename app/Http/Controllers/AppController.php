<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function show()
    {
        return view('app');
    }
}
