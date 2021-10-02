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
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeUntracked($query)
    {
        return $query->whereNull('status_code');
    }

    public function scopeByAuthUser($query)
    {
        // return $query->where('user_id', auth()->user()->id);
    }
}
