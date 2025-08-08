import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Author',
        href: '/authors/create',
    },
];

interface Book {
    id: number,
    title: string
}

interface Prop {
    books: Book[]
}



export default function create({ books }: Prop) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date_of_birth: '',
        address: '',
        books: [] as number[]
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const bookId = selectedBooks.map((book:any) => book.value);
        post(route('authors.store'));
    }

    const [selectedBooks, setSelectedBooks] = useState([]);

    const options = books.map(book => ({
        value: book.id,
        label: book.title
    }))

    const handleChange = (selectedOption: any) => {
        const selectedIds = selectedOption.map((option: any) => option.value);
        setData('books', selectedIds);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Author" />
            <div className='flex h-full flex-1 flex-col gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Author</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete='off' >
                            <div className='grid gap-6 w-8/12'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='name'>Author's Name</Label>
                                    <Input id='name' name='name' type='text' value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder='author name' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='birthdate'>Author's Birth Date</Label>
                                    <Input id='birthdate' name='birthdate' value={data.date_of_birth} onChange={(e) => setData('date_of_birth', e.target.value)} type='date' placeholder='author birthday' className='w-50' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='address'>Author's Address</Label>
                                    <Input id='address' name='address' value={data.address} type='text' onChange={(e) => setData('address', e.target.value)} placeholder='author address' />
                                </div>
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='books'>Authored Books</Label>
                                <Select
                                    isMulti
                                    options={options}
                                    placeholder='Select all the books the author have authored'
                                    className=' text-black'
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='space-x-5'>
                                <Link href={route('authors.index')}><Button className='w-2/12 bg-red-700 hover:bg-red-800'>Back</Button></Link>
                                <Button className='w-3/12 bg-green-600 hover:bg-green-700'>Submit Author</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    );
}
