<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory, HasUuids;
    protected $primaryKey = 'uuid';
    protected $fillable = ['title', 'description', 'completed'];
    protected $guarded = ['uuid'];
    protected $hidden = ['uuid', 'user_id'];
    protected $casts = [
        'completed' => 'boolean',
    ];
    public $incrementing = false;
    function data(){
        // return $this->hasMany(User::class, 'id', 'user_id');
        return $this->hasMany('App\Models\User', 'id', 'user_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

