import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Select from 'react-select';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Book',
        href: '/book/create',
    },
];

interface author {
    id: number,
    name: string
}

interface prop {
    authors: author[]
}

export default function create({ authors }: prop) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        genre: '',
        publication_date: '',
        language: '',
        author: [] as number[] 
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('books.store'));
    }

    const options = authors.map((author) => ({
        value : author.id,
        label: author.name
    }))

    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const handleChange = (selectedOption: any) => {
        const selectedIds = selectedOption.map((option: any) => option.value);
        setData('author', selectedIds);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Book" />
            <div className='flex h-full flex-1 flex-col gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Author</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete='off' >
                            {Object.keys(errors).length > 0 && (

                                <Alert variant={'default'}>
                                    <CircleAlert />
                                    <AlertTitle>Errors!</AlertTitle>
                                    <AlertDescription>
                                        <ul>
                                            {Object.entries(errors).map(([key, message]) => (
                                                <li key={key}>{message as string}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}
                            <div className='grid gap-6 w-8/12'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='title'>Book Title</Label>
                                    <Input id='title' name='title' type='text' value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder='Book title' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='genre'>Book Genre</Label>
                                    <Input id='genre' name='genre' value={data.genre} onChange={(e) => setData('genre', e.target.value)} type='text' placeholder='Book Genre' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='publication_date'>Publication Date</Label>
                                    <Input className='w-50' id='publication_date' name='publication_date' value={data.publication_date} type='date' onChange={(e) => setData('publication_date', e.target.value)} placeholder='Publication Date' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='language'>Book Language</Label>
                                    <Input id='language' name='language' value={data.language} type='text' onChange={(e) => setData('language', e.target.value)} placeholder='Book Langauge' />
                                </div>
                                
                                <div className='grid gap-2'>
                                    <Label htmlFor='authors'>Book Author/s</Label>
                                    <Select
                                        isMulti
                                        options={options}
                                        placeholder='Select Authors of the Book'
                                        className=' text-black'
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className='space-x-5'>
                                <Link href={route('books.index')}><Button className='w-2/12 bg-red-700 hover:bg-red-800'>Back</Button></Link>
                                <Button className='w-3/12 bg-green-600 hover:bg-green-700'>Submit Book</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
