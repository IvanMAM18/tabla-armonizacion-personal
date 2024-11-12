<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    public function index()
    {
        return Logs::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_titulo' => 'required|numeric',
            'tipo_log' => 'required|in:archivo,formato',
            'nombre_log' => 'required|string|max:255',
            'fecha_establecida' => 'required|date', // Validación para la fecha
        ]);

        $logs = Logs::create($request->all());
        return response()->json($logs, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'id_titulo' => 'required|numeric',
            'tipo_log' => 'required|in:archivo,formato',
            'nombre_log' => 'required|string|max:25',
            'fecha_establecida' => 'required|date', // Validación para la fecha
        ]);

        $logs = Logs::findOrFail($id);
        $logs->update($request->all());
        return response()->json($logs);
    }

    public function destroy($id)
    {
        $logs = Logs::findOrFail($id);
        $logs->delete();
        return response()->json(null, 204);
    }
}