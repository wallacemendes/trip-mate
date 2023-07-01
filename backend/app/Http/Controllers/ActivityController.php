<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityCollection;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use App\Models\Trip;
use http\Env\Response;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Trip $trip, Request $request)
    {
        if ($trip->activities()->count() === 0) {
            return response()->json(['message' => 'No activities found'], 404);
        }
        if ($request->has('include')) {
            $includedData = $request->input('include');
            if (str_contains($includedData, 'expenses')) {
                $trip->load('activities.expenses');
            }
        }

        return new ActivityCollection($trip->activities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Trip $trip, Request $request)
    {
        $inputValidation = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'date_format:H:i',
            'description' => 'string',
            'budget' => 'numeric',
        ]);

        $activity = $trip->activities()->create([
            'title' => $inputValidation['title'],
            'date' => $inputValidation['date'],
            'time' => optional($inputValidation)['time'],
            'description' => optional($inputValidation)['description'],
            'budget' => optional($inputValidation)['budget'],
        ]);

        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip, Activity $activity)
    {
        if ($activity->trip_id !== $trip->id) {
            return response()->json(['message' => 'Activity not found for the specified trip'], 404);
        }

        $activity->load('expenses');
        return new ActivityResource($activity);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Trip $trip, Activity $activity, Request $request)
    {
        $method = $request->input('_method');

        if ($method === 'PUT') {
            $inputValidation = $request->validate([
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'time' => 'date_format:H:i',
                'description' => 'string',
                'budget' => 'numeric',
            ]);
        } else {
            $inputValidation = $request->validate([
                'title' => 'sometimes|string|max:255',
                'date' => 'sometimes|date',
                'time' => 'sometimes|nullable|date_format:H:i',
                'description' => 'sometimes|nullable|string',
                'budget' => 'sometimes|nullable|numeric',
            ]);
        }

        $activity->update($inputValidation);

        return response()->json(['message' => 'Activity updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip, Activity $activity)
    {
        if ($activity->trip_id !== $trip->id) {
            return response()->json(['message' => 'Activity not found for the specified trip'], 404);
        }

        $activity->delete();
        return response()->json(['message' => 'Activity deleted successfully']);
    }
}
