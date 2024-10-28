<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id('id_logs'); // ID del log
            $table->unsignedBigInteger('id_titulo'); // ID del título relacionado
            $table->enum('tipo_log', ['archivo', 'formato']); // Tipo de log
            $table->string('nombre_log'); // Nombre del log
            $table->timestamps(); // Timestamps

            // Definir la clave foránea
            $table->foreign('id_titulo')
                  ->references('id_titulo')
                  ->on('titulos')
                  ->onUpdate('cascade') // Actualiza los registros relacionados si el id_titulo cambia
                  ->onDelete('cascade'); // Elimina los logs relacionados si el título es eliminado
        });
    }

    public function down()
    {
        Schema::dropIfExists('logs');
    }

}