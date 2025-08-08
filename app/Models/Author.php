<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    protected $fillable = ['name', 'date_of_birth', 'address'];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class); // Laravel will look for author_book table
    }
}