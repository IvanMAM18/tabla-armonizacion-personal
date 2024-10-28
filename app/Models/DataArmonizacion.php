<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataArmonizacion extends Model
{
    use HasFactory;

    protected $table = 'data_armonizacion';

    protected $fillable = [
        'clasificacion',
    ];
}