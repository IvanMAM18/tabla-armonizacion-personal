<?php

namespace App\Http\Controllers;

use App\Models\DataArmonizacion;
use Illuminate\Http\Request;

class DataArmonizacionController extends Controller
{
    public function index()
    {
        return DataArmonizacion::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'clasificacion' => 'required|string|max:255',
        ]);

        return DataArmonizacion::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'clasificacion' => 'required|string|max:255',
        ]);

        $record = DataArmonizacion::findOrFail($id);
        $record->update($request->all());

        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = DataArmonizacion::findOrFail($id);
        $record->delete();

        return response()->json(null, 204);
    }
}