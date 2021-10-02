<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'data_nascimento',
        'telefone',
        'tem_comorbidades',
        'vacinado_covid19'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'data_nascimento' => 'datetime:Y-m-d',
        'tem_comorbidades' => 'boolean',
        'vacinado_covid19' => 'boolean',
    ];
}
