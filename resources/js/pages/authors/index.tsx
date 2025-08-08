import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Bell, Book } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Authors',
        href: '/authors',
    },
];

interface book {
    id: number,
    title: string,
    genre: string,
    publication_date: Date,
    language: string
}

interface author {
    id: number,
    name: string,
    date_of_birth: Date,
    address: string
    books: book[]
}

interface pageProp {
    flash: {
        message?: string
    },
    authors: author[]
}

export default function index({ authors, flash }: pageProp) {

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete Author : ${name}`)) {
            destroy(route('authors.destroy', id));
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
                    <Link href={route('authors.create')}><Button>Insert New Author</Button></Link>
                </div>
                <div>
                    <Table>
                        <TableCaption>A list of Records of Authors.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Date_Of_Birth</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Books Authored</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        {authors.length > 0 && (
                            <TableBody>
                                {authors.map((author) => (
                                    <TableRow>
                                        <TableCell className="font-medium">{author.id}</TableCell>
                                        <TableCell>{author.name}</TableCell>
                                        <TableCell>{String(author.date_of_birth)}</TableCell>
                                        <TableCell>{author.address}</TableCell>
                                        <TableCell>
                                            <ul>
                                                {(author.books.length > 0) ? author.books.map((Book) => (
                                                    <li>
                                                        <span>{Book.title}</span>
                                                    </li>
                                            )) :
                                                    (<p className="text-sm text-gray-500">No books found.</p>)}
                                            </ul>
                                        </TableCell>
                                        <TableCell className="text-center space-x-2">
                                            <Link href={route('authors.edit', author.id)}><Button className='bg-slate-500 hover:bg-slate-800'>Edit</Button></Link>
                                            <Button onClick={() => handleDelete(author.id, author.name)} className='bg-red-500 hover:bg-red-800'>Delete</Button>
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
