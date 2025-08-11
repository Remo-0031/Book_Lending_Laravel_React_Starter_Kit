<?php

namespace App\Events;

use App\Models\Book;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class BookReturnedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $book;
    public $user;

    public function __construct(Book $book, User $user)
    {
        $this->book = $book;
        $this->user = $user;
        Log::info("BookReturnedEvent fired for user {$this->user->id} and book {$book->id}");
        Log::info("BookReturnedEvent fired for user {$this->user->id} and book {$book->id}");
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): Channel
    {
        Log::info('User property dump:', ['user' => $this->user]);
        return new Channel('user.'.$this->user->id);
    }
    public function broadcastWith()
    {
        return [
            'book_id' => $this->book->id,
            'book_title' => $this->book->title,
            'message' => "The book '{$this->book->title}' has been returned.",
        ];
    }
    
}
