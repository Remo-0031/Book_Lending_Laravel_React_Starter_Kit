<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('students')->insert([
            [
                'name' => 'Alice Cruz',
                'date_of_birth' => '2002-05-01',
                'address' => 'Quezon City'
            ],
            [
                'name' => 'Ben Reyes',
                'date_of_birth' => '2001-11-15',
                'address' => 'Makati City'
            ],
            [
                'name' => 'Carla Gomez',
                'date_of_birth' => '2003-01-20',
                'address' => 'Cebu City'
            ],
        ]);
    }
}
