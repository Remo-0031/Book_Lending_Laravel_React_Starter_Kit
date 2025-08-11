<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Console\Input\Input;

use function PHPUnit\Framework\isEmpty;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = book::with('authors')->get();
        $user = auth()->user();
        return Inertia::render('books/index', compact('books', 'user'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $authors = Author::all();
        return Inertia::render('books/create', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        $books = book::create([
            'title' => $validated['title'],
            'genre' => $validated['genre'],
            'publication_date' => $validated['publication_date'],
            'language' => $validated['language']
        ]);

        if (!empty($validated['author'])) {
            $books->authors()->attach($validated['author']);
        }

        return redirect()->route('books.index')->with('message', 'book successfully Recorded!');
    }

    /**
     * Display the specified resource.
     */
    public function show(book $books)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(book $book)
    {
        $book->load('authors');
        $author = author::all();
        return Inertia::render('books/edit', compact('book', 'author'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, book $book)
    {
        $validated = $request->validated();

        $book->update([
            'title' => $validated['title'],
            'genre' => $validated['genre'],
            'publication_date' => $validated['publication_date'],
            'language' => $validated['language']
        ]);

        $book->authors()->sync($validated['author'] ?? []);

        return redirect()->route('books.index')->with('message', 'Book Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(book $book)
    {
        $book->delete();
        return redirect()->route('books.index')->with('message', 'Book Successfully Deleted');
    }

    public function subscribe(book $book)
    {
        $user = auth()->user();

        if ($user->role !== 'student') {
            return redirect()->back()->with('message', 'Only students can subscribe.');
        }

        $isSubscribed = $user->subscribedBooks()->where('book_id',$book->id)->exists();

        if($isSubscribed) {
            return redirect()->back()->with('message', 'You are already subsribed to this book');
        }

        $isAvailable = Book::where('id', $book->id)
            ->whereDoesntHave('transactions', function ($query) {
                $query->where('status', 'borrowed');
            })
            ->exists();

        if ($isAvailable) {
            return redirect()->back()->with('message', 'Book is not borrowed');
        }

        $user->subscribedBooks()->attach($book->id);

        return redirect()->back()->with('message', 'Subscribed successfully!');
    }
}
