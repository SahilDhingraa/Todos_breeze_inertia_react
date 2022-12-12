<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TodoController extends Controller
{

    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $todos = Todo::where('user_id', $userId)->get();
        return Inertia::render('Todo/Index', [
            'todos' => $todos
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // dd($request);
        // $validator = $request->validate([
        //     'title' => 'required',
        //     'completed' => 'required',
        // ]);
        // if($validator->fails()){
        //     return response()->json($validator->errors(), 400);
        // }
        $userId = $request->user()->id;

        $todo = new Todo();
        $todo->uuid = Str::uuid();
        $todo->user()->associate($userId);
        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        $todo->completed = $request->input('completed');
        $todo->save();
        return Inertia::render('Todo/Index');
    }

    public function show($id)
    {
        //
    }

    public function edit($uuid)
    {
        $todo = Todo::where('uuid', $uuid)->first();
        return $todo;
    }

    public function update(Request $request, $uuid)
    {
        $validator = $request->validate([
            'title' => 'required',
            'completed' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $todo = Todo::where('uuid', $uuid)->first();
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->completed = $request->completed;
        $todo->save();
    }

    public function destroy($uuid)
    {
        Todo::where('uuid', $uuid)->first()->delete();
    }
}
