import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import React from 'react';

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
    student_id:number,
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

export default function Dashboard({ transaction, flash }: prop) {

    const { processing, delete: destroy } = useForm();


    const handleDelete = (id: number) => {
        if(confirm(`Do you want to delete transaction ID: ${id}`)) { 
            destroy(route('transactions.destory',id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='m-4'>
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
                    <Link href={route('transactions.create')}><Button>Insert New Transaction</Button></Link>
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
                                <TableHead className="text-center">Actions</TableHead>
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
                                            <Link href={route('transactions.edit', tran.id)}><Button className='bg-slate-500 hover:bg-slate-800'>Edit</Button></Link>
                                            <Button onClick={() => { handleDelete(tran.id) }} className='bg-red-500 hover:bg-red-800'>Delete</Button>
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

