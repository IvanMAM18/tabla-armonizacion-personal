<?php

namespace App\Http\Controllers;

use App\Models\TablaDataArmonizacion;
use Illuminate\Http\Request;

class TablaDataArmonizacionController extends Controller
{
    public function index()
    {
        return TablaDataArmonizacion::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'clasificacion' => 'required|string|max:255',
            'puntosOne' => 'nullable|string',
            'puntosTwo' => 'nullable|string',
            'archivo' => 'nullable|string',
            'formato' => 'nullable|string',
        ]);

        return TablaDataArmonizacion::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'clasificacion' => 'required|string|max:255',
            'puntosOne' => 'nullable|string',
            'puntosTwo' => 'nullable|string',
            'archivo' => 'nullable|string',
            'formato' => 'nullable|string',
        ]);

        $record = TablaDataArmonizacion::findOrFail($id);
        $record->update($request->all());

        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = TablaDataArmonizacion::findOrFail($id);
        $record->delete();

        return response()->json(null, 204);
    }
}