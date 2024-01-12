<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class record extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'day', 'month', 'year', 'category_id', 'preset_id'];
}
