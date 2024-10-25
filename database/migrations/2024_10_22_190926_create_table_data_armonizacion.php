<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tablaDataArmonizacion', function (Blueprint $table) {
            $table->id();
            $table->string('clasificacion');
            $table->string('puntosOne')->nullable();
            $table->string('puntosTwo')->nullable();
            $table->string('archivo')->nullable();
            $table->string('formato')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tablaDataArmonizacion');
    }
};
