import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useEcho, useEchoPublic } from '@laravel/echo-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import NotificationBell from '@/components/notification-bell';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lendings',
        href: '/dashboard',
    },
];

interface book {
    id: number,
    title: string
}

interface transaction {
    id: number,
    attendant_id: number,
    student_id: number,
    lend_date: Date,
    return_date: Date,
    status: string
    books: book[]
}

interface prop {
    transaction: transaction[]
    flash: {
        message?: string
    }
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user: {
            role: string;
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function Dashboard({ transaction, flash }: prop) {

    const { auth } = usePage<PageProps>().props;
    const { processing, delete: destroy } = useForm();
    const [notificationCount, setNotificationCount] = useState(0);

    const handleDelete = (id: number) => {
        if (confirm(`Do you want to delete transaction ID: ${id}`)) {
            destroy(route('transactions.destory', id));
        }
    }
    const userId = auth.user.id;
    // console.log('Subscribing to channel:', `user.${userId}`);
    // console.log(notificationCount);
    // useEchoPublic(`user.${userId}`, 'BookReturnedEvent', (event: any) => {
    //     console.log('Event received:', event.message);
    //     setNotificationCount(notificationCount => notificationCount+1);
    // }).listen();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='m-4'>
                <div>
                    <header className="flex justify-end p-4">
                        <NotificationBell userId={userId} />
                    </header>
                </div>
                <div>
                    {flash.message && (
                        <Alert variant={'default'}>
                            <Bell />
                            <AlertTitle>Notification</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}

                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-end m-10'>
                    {auth.user.role == 'attendant' && (
                        <>
                            <Link href={route('transactions.create')}><Button>Insert New Transaction</Button></Link>
                        </>
                    )}
                </div>
                <div>
                    <Table>
                        <TableCaption>A list of Records of Transactions</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>attendant_id</TableHead>
                                <TableHead>Borowee_id</TableHead>
                                <TableHead>lend_date</TableHead>
                                <TableHead>return_date</TableHead>
                                <TableHead>status</TableHead>
                                <TableHead>Borrowed Books</TableHead>
                                {auth.user.role == 'attendant' && (
                                    <TableHead className="text-center">Actions</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        {transaction.length > 0 && (
                            <TableBody>
                                {transaction.map((tran) => (
                                    <TableRow>
                                        <TableCell className="font-medium">{tran.id}</TableCell>
                                        <TableCell>{tran.attendant_id}</TableCell>
                                        <TableCell>{tran.student_id}</TableCell>
                                        <TableCell>{String(tran.lend_date)}</TableCell>
                                        <TableCell>{String(tran.return_date)}</TableCell>
                                        <TableCell>{tran.status}</TableCell>
                                        <TableCell>
                                            <ul>
                                                {(tran.books.length > 0) ? tran.books.map((book) => (
                                                    <li>
                                                        {book.title}
                                                    </li>
                                                )) : (
                                                    <p className="text-sm text-gray-500">All books returned</p>
                                                )}
                                            </ul>
                                        </TableCell>
                                        <TableCell className="text-center space-x-2">
                                            {auth.user.role == 'attendant' && (
                                                <>
                                                    <Link href={route('transactions.edit', tran.id)}><Button className='bg-slate-500 hover:bg-slate-800'>Edit</Button></Link>
                                                    <Button onClick={() => { handleDelete(tran.id) }} className='bg-red-500 hover:bg-red-800'>Delete</Button>
                                                </>
                                            )}

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

