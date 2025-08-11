<?php

namespace App\Http\Controllers;

use App\Events\BookReturnedEvent;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Mail\BorrowedBooksMail;
use App\Models\Book;
use App\Models\Student;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\BookReturnedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function create()
    {
        $students = User::where('role', 'student')->get();
        $books = Book::whereDoesntHave('transactions', function ($query) {
            $query->where('status', 'borrowed');
        })->get(['id', 'title']);
        return Inertia::render('create', compact('books', 'students'));
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
        $boroweeInformation = User::find($validated['student_id']);
        $transaction->load('books.authors');
        // dd($transaction);
        Mail::to($boroweeInformation->email)->queue(new BorrowedBooksMail($boroweeInformation, $transaction->books));

        return redirect()->route('dashboard')->with('message', 'Transaction Added Successfully');
    }

    public function dashboard()
    {
        $user = auth()->user();
        if ($user->role == 'student') {
            $transaction = Transaction::with('books')->where('student_id', $user->id)->get();
        } else {
            $transaction = Transaction::with('books')->get();
        }
        return Inertia::render('dashboard', compact('transaction'));
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->route('dashboard')->with('message', 'Transaction Successfully Delete');
    }

    public function edit(Transaction $transaction)
    {
        $transaction->load('books');
        $book = book::all();
        $students = User::where('role', 'student')->get();
        return Inertia::render('edit', compact('transaction', 'book', 'students'));
    }

    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $validated = $request->validated();

        $transaction->update([
            'attendant_id' => $validated['attendant_id'],
            'student_id' => $validated['student_id'],
            'lend_date' => $validated['lend_date'],
            'return_date' => $validated['return_date'],
            'status' => $validated['status'],
        ]);

        if ($validated['status'] === 'returned') {
            $books = Book::whereIn('id', $validated['books'])->with('subscribers')->get();
            foreach ($books as $book) {
                foreach ($book->subscribers as $user) {
                    event(new BookReturnedEvent($book, $user));
                }
            }
        }

        $transaction->books()->sync($validation['books'] ?? []);

        return redirect()->route('dashboard')->with('message', 'Transaction Successfully Updated');
    }
}