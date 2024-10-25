<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;


class TablaDataArmonizacion extends Model
{
    use HasFactory;

    protected $table = 'tablaDataArmonizacion';

    protected $fillable = [
        'clasificacion',
        'puntosOne',
        'puntosTwo',
        'archivo',
        'formato'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
