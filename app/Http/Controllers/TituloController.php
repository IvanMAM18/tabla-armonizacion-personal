<?php

namespace App\Http\Controllers;

use App\Models\Titulo;
use Illuminate\Http\Request;

class TituloController extends Controller
{
    public function index()
    {
        return Titulo::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'puntosOne' => 'required|numeric',
            'puntosTwo' => 'required|numeric',
            'apartado' => 'required|integer',
            'tipo' => 'required|in:titulo,subtitulo',
        ]);

        $titulo = Titulo::create($request->all());
        return response()->json($titulo, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'puntosOne' => 'required|numeric',
            'puntosTwo' => 'required|numeric',
            'apartado' => 'required|integer',
            'tipo' => 'required|in:titulo,subtitulo',
        ]);

        $titulo = Titulo::findOrFail($id);
        $titulo->update($request->all());
        return response()->json($titulo);
    }

    public function destroy($id)
    {
        $titulo = Titulo::findOrFail($id);
        $titulo->delete();
        return response()->json(null, 204);
    }
}