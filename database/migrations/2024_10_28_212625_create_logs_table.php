<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id('id'); // ID del log
            $table->integer('id_titulo'); // ID del título relacionado
            $table->enum('tipo_log', ['archivo', 'formato']); // Tipo de log
            $table->string('nombre_log'); // Nombre del log
            $table->timestamps(); // Timestamp
        });
    }

    public function down()
    {
        Schema::dropIfExists('logs');
    }

}