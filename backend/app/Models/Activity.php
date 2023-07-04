<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start',
        'end',
        'description',
        'cost',
    ];


    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}
