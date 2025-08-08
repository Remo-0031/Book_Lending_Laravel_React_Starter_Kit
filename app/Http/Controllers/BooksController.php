<?php

namespace App\Http\Controllers;

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
        return Inertia::render('books/index', compact('books'));
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'string|max:255|required',
            'genre' => 'string|max:255|nullable',
            'publication_date' => 'date|nullable',
            'language' => 'nullable|string|max:255',
            'author' => 'array',
            'author.*' => 'exists:authors,id'
        ]);

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
    public function update(Request $request, book $book)
    {
        $validated = $request->validate([
            'title' => 'string|max:255|required',
            'genre' => 'string|max:255|nullable',
            'publication_date' => 'date|nullable',
            'language' => 'nullable|string|max:255',
            'author' => 'array',
            'author.*' => 'exists:authors,id'
        ]);

        $book->update([
            'title' => $request->input('title'),
            'genre' => $request->input('genre'),
            'publication_date' => $request->input('publication_date'),
            'language' => $request->input('language')
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
}
