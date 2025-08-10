@component('mail::message')
# Hello {{ $borrowee->name }},

Here’s the list of books you borrowed:

@component('mail::table')
| Title          | Author         |
|----------------|----------------|
@foreach($books as $book)
| {{ $book->title }} | {{ $book->author->name ?? 'Unknown' }} |
@endforeach
@endcomponent