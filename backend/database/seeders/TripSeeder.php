<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trip;
use App\Models\User;

class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create();

        Trip::factory()
            ->count(4)
            ->for($user)
            ->create();

        Trip::factory()
            ->count(1)
            ->for($user)
            ->create();
    }
}
