<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Auth;
use App\Board;
use App\User;

class GeneralController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function home() {
        return view('home');
    }

    public function main($id) {
        $board = Board::find($id);
        return view('board', ['board' => $board]);
    }

    public function profile() {
        return view('profile');
    }

    // public function avatar(Request $request) {
    //     $user = Auth::user();
    //     if ($request->hasFile('photo')) {
    //         $file = $request->file('photo');
    //         $extension = $file->getClientOriginalExtension();
    //         if ($extension != 'jpg' && $extension != 'png' && $extension != 'jepg') {
    //             return redirect('/home')->with('errorMessage', 'You have just uploaded extension file: .jpg, .png, .jpeg');
    //         }
            
    //         $name = $file->getClientOriginalName();
    //         $avatar = Str::random(6)."_".$name;
    //         while (file_exists("uploads".$avatar)) {
    //             $avatar = Str::random(6)."_".$name;
    //         }
    //         $file->move("uploads", $avatar);
    //         $user->avatar = $avatar;
    //     } 
    //     $user->save();
    //     return redirect('/home');
    // }
}
