<?php

namespace App\Http\Controllers;

use App\Models\author;
use App\Models\Author as ModelsAuthor;
use App\Models\book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = Author::with('books')->get();
        return Inertia::render('authors/index', compact('authors'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $books = book::all(['id', 'title']);
        return Inertia::render('authors/create', [
            'books' => $books
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|max:255|string',
            'date_of_birth' => 'date|nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'books' => 'array',
            'books.*' => 'exists:books,id'
        ]);
        $author = author::create([
            'name' => $validated['name'],
            'date_of_birth' => $validated['date_of_birth'],
            'address' => $validated['address']
        ]);
        if (!empty($validated['books'])) {
            $author->books()->attach($validated['books']);
        }
        return redirect()->route('authors.index')->with('message', 'Author Added Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(author $authors)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(author $author)
    {
        $author->load('books');
        $book = book::all() ;
        return Inertia::render('authors/edit', compact('author','book'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, author $author)
    {
        $validation = $request->validate([
            'name' => 'required|max:255|string',
            'date_of_birth' => 'date|nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'books' => 'array',
            'books.*' => 'exists:books,id'
        ]);

        $author->update([
            'name' => $request->input('name'),
            'date_of_birth' => $request->input('date_of_birth'),
            'address' => $request->input('address')
        ]);

        $author->books()->sync($validation['books'] ?? []);

        return redirect()->route('authors.index')->with('message', 'Author Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(author $author)
    {
        $author->delete();
        return redirect()->route('authors.index')->with('message', 'Author Successfully Deleted');
    }
}
