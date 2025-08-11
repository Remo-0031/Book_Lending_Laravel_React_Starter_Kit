import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Bell } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

interface author {
    id: number,
    name: string,
    date_of_birth: Date,
    address: string
}

interface Book {
    id: number,
    title: string,
    genre: string,
    publication_date: Date,
    language: string
    authors: author[]
}

interface Props {
    flash: {
        message?: string
    },
    books: Book[],
    user: User
}

export default function index({ books, flash, user }: Props) {

    const { delete: destroy } = useForm();

    const notifyForm = useForm();

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Do you want to delete book titled: ${title}`)) {
            destroy(route('books.destroy', id));
        }
    }
    const handleNotify = (bookid: number) => {
        notifyForm.post(route('books.subscribe', bookid));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
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
                    {user.role == 'attendant' && (
                        <>
                            <Link href={route('books.create')}><Button>Insert New Books</Button></Link>
                        </>
                    )}
                </div>
                <div>

                    <Table>
                        <TableCaption>A list of Records of Authors.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Publication Date</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead>Authors</TableHead>
                                {user.role == 'attendant' && (
                                    <>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </>
                                )}

                            </TableRow>
                        </TableHeader>
                        {books.length > 0 && (
                            <TableBody>
                                {books.map((book) => (
                                    <TableRow>
                                        <TableCell className="font-medium">{book.id}</TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell>{String(book.publication_date)}</TableCell>
                                        <TableCell>{book.language}</TableCell>
                                        <TableCell>
                                            <ul>
                                                {(book.authors.length > 0) ? book.authors.map((author) => (
                                                    <li>
                                                        {author.name}
                                                    </li>
                                                )) : (
                                                    <p className="text-sm text-gray-500">There is no Author for this book</p>
                                                )}
                                            </ul>
                                        </TableCell>
                                        <TableCell className="text-center space-x-2">
                                            {user.role == 'attendant' && (
                                                <>
                                                    <Link href={route('books.edit', book.id)}><Button className='bg-slate-500 hover:bg-slate-800'>Edit</Button></Link>
                                                    <Button onClick={() => { handleDelete(book.id, book.title) }} className='bg-red-500 hover:bg-red-800'>Delete</Button>
                                                </>
                                            )}

                                            {user.role == 'student' && (
                                                <Button onClick={() => { handleNotify(book.id) }} className='bg-green-400 hover:bg-green-800'>Notify</Button>
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
