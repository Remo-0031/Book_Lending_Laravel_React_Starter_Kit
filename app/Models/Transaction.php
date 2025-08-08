<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //
    protected $fillable = ['attendant_id','student_id', 'lend_date', 'return_date', 'status'];

    public function attendant()
    {
        return $this->belongsTo(User::class);
    }
    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_transaction');
    }
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
