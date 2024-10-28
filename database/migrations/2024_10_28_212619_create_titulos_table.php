<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTitulosTable extends Migration
{
    public function up()
    {
        Schema::create('titulos', function (Blueprint $table) {
            $table->id('id_titulo'); // ID del título
            $table->string('nombre'); // Nombre del título
            $table->integer('puntosOne'); // Puntos One
            $table->integer('puntosTwo'); // Puntos Two
            $table->integer('apartado'); // Apartado
            $table->enum('tipo', ['titulo', 'subtitulo']); // Tipo
            $table->timestamps(); // Timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('titulos');
    }
}
