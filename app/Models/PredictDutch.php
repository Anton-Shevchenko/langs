<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PredictDutch extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'word',
    ];
}
