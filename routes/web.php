<?php

use App\Http\Controllers\AuthorsController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TransactionsController::class,'dashboard'])->name('dashboard');
    
    //GET (Transaction)
    Route::get('/create',[TransactionsController::class,'create'])->name('transactions.create');
    Route::get('/edit/{transaction}',[TransactionsController::class,'edit'])->name('transactions.edit');
    
    //GET (Authors)
    Route::get('/authors',[AuthorsController::class,'index'])->name('authors.index');
    Route::get('/authors/create',[AuthorsController::class,'create'])->name('authors.create');
    Route::get('/authors/edit/{author}',[AuthorsController::class,'edit'])->name('authors.edit');
    
    //Get (Books)
    Route::get('/books',[BooksController::class,'index'])->name('books.index');
    Route::get('/books/create',[BooksController::class,'create'])->name('books.create');
    Route::get('/books/edit/{book}',[BooksController::class,'edit'])->name('books.edit');

    //POST (Authors)
    Route::post('/authors/store',[AuthorsController::class,'store'])->name('authors.store');

    //POST (Books)
    Route::post('/books/store',[BooksController::class,'store'])->name('books.store');

    //POST (Transaction)
    Route::post('/store',[TransactionsController::class,'store'])->name('transactions.store');

    //DELETE (Authors)
    Route::delete('/authors/delete/{author}',[AuthorsController::class,'destroy'])->name('authors.destroy');

    //Delete (Books)
    Route::delete('/books/delete/{book}',[BooksController::class,'destroy'])->name('books.destroy');

    //Dekete (Transaction)
    Route::delete('/delete/{transaction}',[TransactionsController::class,'destroy'])->name('transactions.destory');

    //PUT (Authors)
    Route::put('/authors/edit/{author}',[AuthorsController::class,'update'])->name('authors.update');

    //PUT (Books)
    Route::put('/books/edit/{book}',[BooksController::class,'update'])->name('books.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
