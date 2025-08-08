<?php

// app/Models/Book.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    protected $fillable = ['title', 'genre', 'publication_date', 'language'];

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class); 
    }
    public function transactions()
    {
        return $this->belongsToMany(Transaction::class, 'book_transaction');
    }
}
