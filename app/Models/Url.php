<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'response_body',
        'method'.
        'data_nascimento',
        'status_code',
        'date_access',
    ];

    public function scopeUntracked($query)
    {
        $query->whereNull('status_code');
    }

    public function scopeByAuthUser($query)
    {
        $query->where('user_id', auth()->user()->id);
    }
}
