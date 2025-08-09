<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Book;
use App\Models\Student;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function create()
    {
        $students = Student::all(['id','name']);
        $books = Book::all(['id', 'title']);
        return Inertia::render('create', compact('books','students'));
    }

    public function store(StoreTransactionRequest $request)
    {
        $validated = $request->validated();

        $transaction = Transaction::create([
            'attendant_id' => $validated['attendant_id'],
            'student_id' => $validated['student_id'], 
            'lend_date' => $validated['lend_date'],
            'return_date' => $validated['return_date'],
            'status' => $validated['status']
        ]);

        if (!empty($validated['books'])) {
            $transaction->books()->attach($validated['books']);
        }
        return redirect()->route('dashboard')->with('message', 'Transaction Added Successfully');
    }

    public function dashboard()
    {
        $transaction = Transaction::with('books')->get();
        return Inertia::render('dashboard',compact('transaction'));
    }

    public function destroy(Transaction $transaction) {
        $transaction->delete();
        return redirect()->route('dashboard')->with('message','Transaction Successfully Delete');
    }

    public function edit(Transaction $transaction){
        $transaction->load('books');
        $book = book::all() ;
        $students = Student::all();
        return Inertia::render('edit', compact('transaction','book','students'));
    }

    public function update(UpdateTransactionRequest $request,Transaction $transaction){
        $validated = $request->validated();

        $transaction->update([
            'attendant_id' => $validated['attendant_id'],
            'student_id' => $validated['student_id'],
            'lend_date' => $validated['lend_date'],
            'return_date' => $validated['return_date'],
            'status' => $validated['status'],
        ]);

        $transaction->books()->sync($validation['books'] ?? []);

        return redirect()->route('dashboard')->with('message', 'Transaction Successfully Updated');
    }
}