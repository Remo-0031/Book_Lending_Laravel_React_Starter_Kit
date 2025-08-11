import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Auth, type BreadcrumbItem } from '@/types';
import Select from 'react-select';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';
import { UserInfo } from '@/components/user-info';
import { PageProps as InertiaPageProps } from '@inertiajs/core'



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Transaction',
        href: '/create',
    },
];

interface Book {
    id: number,
    title: string
}

interface student {
    id: number,
    name: string,
    date_of_birth: Date,
    address: string
}

interface prop {
    books: Book[]
    students: student[]
}

interface PageProps extends InertiaPageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function create({ books, students }: prop) {


    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        attendant_id: auth.user.id,
        student_id: '',
        lend_date: new Date().toISOString().split('T')[0],
        return_date: '',
        status: '',
        books: [] as number[]
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('transactions.store'));
    }

    const options = books.map((book) => ({
        value: book.id,
        label: book.title
    }))

    const options_status = [{
        value: 'borrowed',
        label: 'borrowed'
    }, {
        value: 'returned',
        label: 'returned'
    }]

    const options_student = students.map((stud) => ({
        value: stud.id,
        label: stud.name
    }))


    const handleChange = (selectedOption: any) => {
        const selectedIds = selectedOption.map((option: any) => option.value);
        setData('books', selectedIds);
    }

    const handleChange_student = (selectedOption: any) => {
        setData('student_id', selectedOption?.value);
    }

    const handleChange_status = (selectedOption: any)=>{
        setData('status',selectedOption?.value);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Transaction" />
            <div className='flex h-full flex-1 flex-col gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Transaction</CardTitle>
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
                                    <Label htmlFor='attendant_id'>attendant_id</Label>
                                    <Input id='attendant_id' name='attendant_id' type='number' value={data.attendant_id} onChange={(e) => setData('attendant_id', parseInt(e.target.value))} placeholder='attendant_id' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='authors'>Student Name</Label>
                                    <Select
                                        options={options_student}
                                        placeholder='Select the name of the student who want to borrow Book'
                                        className=' text-black'
                                        onChange={handleChange_student}
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='lend_date'>lend_date </Label>
                                    <Input className='w-50' id='lend_date' name='lend_date' value={data.lend_date} onChange={(e) => setData('lend_date', e.target.value)} type='date' placeholder='lend_date' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='return_date'>return_date</Label>
                                    <Input className='w-50' id='return_date' name='return_date' value={data.return_date} type='date' onChange={(e) => setData('return_date', e.target.value)} placeholder='return_date' />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='authors'>Status</Label>
                                    <Select
                                        options={options_status}
                                        placeholder='Select the Status of Book'
                                        className=' text-black'
                                        onChange={handleChange_status}
                                    />
                                </div>

                                <div className='grid gap-2'>
                                    <Label htmlFor='authors'>Book Author/s</Label>
                                    <Select
                                        isMulti
                                        options={options}
                                        placeholder='Select books that want to be borrowed'
                                        className=' text-black'
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className='space-x-5'>
                                <Link href={route('dashboard')}><Button className='w-2/12 bg-red-700 hover:bg-red-800'>Back</Button></Link>
                                <Button className='w-3/12 bg-green-600 hover:bg-green-700'>Submit Book</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
