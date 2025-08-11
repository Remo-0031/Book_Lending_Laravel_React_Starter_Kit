<?php

namespace App\Notifications;

use App\Models\Book;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class BookReturnedNotification extends Notification implements ShouldQueue, ShouldBroadcast
{
    use Queueable;

    public function __construct(public Book $book) {}

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'book_id' => $this->book->id,
            'book_title' => $this->book->title,
            'message' => "Book '{$this->book->title}' returned.",
            'returned_at' => now()->toDateTimeString(),
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'book_title' => $this->book->title,
            'returned_at' => now()->toDateTimeString(),
        ]);
    }

    public function broadcastOn()
    {
        return ['private-App.Models.User.' . $this->book->user_id];
    }
}

