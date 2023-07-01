<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $totalCost = $this->expenses->sum('amount');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'date' => $this->date,
            'time' => $this->time,
            'description' => $this->description,
            'cost' => $totalCost,
            'budget' => $this->budget,
            'tripId' => $this->trip_id,
            'expenses' => ExpenseResource::collection($this->whenLoaded('expenses'))
        ];
    }
}
