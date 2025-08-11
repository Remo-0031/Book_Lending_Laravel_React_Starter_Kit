<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('user.{userID}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;;
});
