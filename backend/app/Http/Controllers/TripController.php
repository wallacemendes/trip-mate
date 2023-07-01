<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTripRequest;
use App\Http\Requests\UpdateTripRequest;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\TripResource;
use App\Http\Resources\TripCollection;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $myTrips = auth()->user()->trips;
        $sharedTrips = auth()->user()->sharedWithMe;

        return new TripCollection($myTrips->concat($sharedTrips));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTripRequest $request)
    {
        $trip = new Trip($request->validated());
        $trip->user_id = auth()->id();
        $trip->save();

        return new TripResource($trip);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip, Request $request)
    {
        if ($trip->user_id !== auth()->id() &&
            !auth()->user()->sharedWithMe->pluck('id')->contains($trip->id)) {
            return response()->json(
                ['error' => 'Forbidden: User cannot access this trip'],
                403
            );
        }
        if ($request->has('include')) {
            $includedData = $request->input('include');
            if (str_contains($includedData, 'activities')) {
                $trip->load('activities');
            }
        }

        return new TripResource($trip);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, Trip $trip)
    {
        $trip->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip)
    {
        if ($trip->user_id !== auth()->id()) {
            return response()->json(['message' => 'Only owner user can delete a trip'], 403);
        }
        $trip->delete();
        return response()->json(['message' => 'Trip deleted successfully']);
    }
}
