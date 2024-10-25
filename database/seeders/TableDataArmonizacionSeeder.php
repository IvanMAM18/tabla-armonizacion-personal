<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableDataArmonizacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ruta del archivo CSV
        $filePath = resource_path('/data/data.csv');

        // Abrir el archivo CSV
        if (($handle = fopen($filePath, 'r')) !== false) {
            // Leer la primera línea para obtener los encabezados
            $headers = fgetcsv($handle, 1000, ',');

            // Leer cada línea del archivo CSV
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                // Combinar encabezados con los datos
                $row = array_combine($headers, $data);

                // Insertar en la base de datos
                DB::table('tablaDataArmonizacion')->insert([
                    'clasificacion' => $row['clasificacion'],
                    'puntosOne' => $row['puntosOne'],
                    'puntosTwo' => $row['puntosTwo'],
                    'archivo' => $row['archivo'],
                    'formato' => $row['formato'],
                ]);
            }
            fclose($handle);
        }
    }
}