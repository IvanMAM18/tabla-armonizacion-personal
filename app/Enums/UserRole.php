<?php

namespace App\Enums;

class UserRole
{
    const ADMIN = 'admin';
    const USUARIO = 'usuario';
    const NEGOCIO = 'negocio';

    const TYPES = [
        self::ADMIN,
        self::USUARIO,
        self::NEGOCIO,
    ];
}
