import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Select from 'react-select';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Author',
        href: '/authors/edit',
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

interface Prop {
    author: author
    book: book[]
}

export default function edit({ author, book }: Prop) {

    const { data, setData, put, processing, errors } = useForm({
        name: author.name,
        date_of_birth: String(author.date_of_birth),
        address: author.address,
        books: author.books.map(book => book.id)
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        put(route('authors.update', author.id),{
            onSuccess: () =>{}
        });
    }

    const options = book.map(book => ({
        value: book.id,
        label: book.title
    }))

    const [selectedBooks, setSelectedBooks] = useState([]);

    const handleChange = (selectedOption: any) => {
        setSelectedBooks(selectedOption);
        const selectedIds = selectedOption.map((option: any) => option.value);
        setData('books', selectedIds);    
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Author" />
            <div className='flex h-full flex-1 flex-col gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Author</CardTitle>
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
                                <Select
                                    isMulti
                                    options={options}
                                    placeholder='Select all the books the author have authored'
                                    className=' text-black'
                                    value={options.filter(option => data.books.includes(option.value))}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-x-5'>
                                <Link href={route('authors.index')}><Button className='w-2/12 bg-red-700 hover:bg-red-800'>Back</Button></Link>
                                <Button className='w-3/12 bg-green-600 hover:bg-green-700'>Edit Author</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
