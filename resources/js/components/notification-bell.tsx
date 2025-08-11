import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useEchoPublic } from '@laravel/echo-react';
import { toast, ToastContainer } from 'react-toastify';

export default function NotificationBell({ userId }: { userId: number }) {
    const [notificationCount, setNotificationCount] = useState(0);


    useEchoPublic(`user.${userId}`, 'BookReturnedEvent', (event: any) => {
        console.log('Notification event:', event.message);
        setNotificationCount(count => count + 1);
        toast.info(event.message);
    });

    const clearNotifications = () => setNotificationCount(0);

    return (
        <>
            <div className="relative cursor-pointer" aria-label="Notifications">
                <Bell size={30} />
                {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {notificationCount}
                    </span>
                )}
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}