<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = 'trip to' . "{$this->faker->city()}";
        $start_date = $this->faker->dateTimeBetween('-1 months', 'now');
        $end_date = $this->faker->dateTimeBetween('tomorrow', '+1 months');
        $location = $this->faker->city();
        $currency = $this->faker->randomElement(['BRL', 'USD', 'EUR']);
        $budget = $this->faker->numberBetween(100, 20000);
        return [
            'user_id' => User::factory(),
            'title' => $title,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'location' => $location,
            'currency' => $currency,
            'budget' => $budget
        ];
    }
}
