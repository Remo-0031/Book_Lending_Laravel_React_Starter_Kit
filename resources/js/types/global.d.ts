import type { route as routeFn } from 'ziggy-js';
import Echo from 'laravel-echo';

declare global {
    interface Window {
        Echo: Echo;
    }
}

export {};

declare global {
    const route: typeof routeFn;
}
