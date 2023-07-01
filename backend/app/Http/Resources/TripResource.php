<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'location' => $this->location,
            'currency' => $this->currency,
            'budget' => $this->budget,
            'userId' => $this->user_id,
            'activities' => ActivityResource::collection($this->whenLoaded('activities'))
        ];
    }
}
