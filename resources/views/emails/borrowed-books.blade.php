@component('mail::message')
# Hello {{ $borrowee->name }},

Here’s the list of books you borrowed:

@component('mail::table')
| Title          | Author         |
|----------------|----------------|
@foreach($books as $book)
| {{ $book->title }} |@if($book->authors->isNotEmpty()) {{ $book->authors->pluck('name')->join(', ') }} @else Unknown Author @endif |
@endforeach
@endcomponent