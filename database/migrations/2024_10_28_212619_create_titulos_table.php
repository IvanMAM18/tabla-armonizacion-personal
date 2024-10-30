<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTitulosTable extends Migration
{
    public function up()
    {
        Schema::create('titulos', function (Blueprint $table) {
            $table->id('id'); // ID del título
            $table->string('nombre'); // Nombre del título
            $table->decimal('puntosOne', 8, 2); // Puntos One
            $table->decimal('puntosTwo', 8, 2); // Puntos Two
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
