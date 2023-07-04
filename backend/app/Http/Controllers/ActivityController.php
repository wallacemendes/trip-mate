<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityCollection;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use App\Models\Trip;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
            if (str_contains($includedData, 'epoch')) {
                $trip->activities->transform(function ($activity){
                   $activity->start = strtotime($activity->start);
                   $activity->end = strtotime($activity->end);
                   return $activity;
                });
            }
        }

        return new ActivityCollection($trip->activities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Trip $trip, Request $request)
    {
        $inputValidation = $this->checkValidation($request,'required');

        $activity = $trip->activities()->create([
            'title' => $inputValidation['title'],
            'start' => $inputValidation['start'],
            'end' => $inputValidation['end'],
            'description' => optional($inputValidation)['description'],
            'cost' => optional($inputValidation)['cost'],
        ]);

        return response()->json($activity, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip, Activity $activity)
    {
        if ($activity->trip_id !== $trip->id) {
            return response()->json(['message' => 'Atividade não encontrada para a viagem especificada'], 404);
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
            $inputValidation = $this->checkValidation($request, 'required');
        } else {
            $inputValidation = $this->checkValidation($request);
        }

        $activity->update($inputValidation);

        return response()->json(['message' => 'Atividade atualizada com sucesso']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip, Activity $activity)
    {
        if ($activity->trip_id !== $trip->id) {
            return response()->json(['message' => 'Atividade não encontrada para a viagem especificada'], 404);
        }

        $activity->delete();
        return response()->json(['message' => 'Atividade deletada com sucesso']);
    }

    public function getActivitiesByDay(Trip $trip, $date){
        $activities = Activity::where( 'trip_id', $trip->id)->whereDate('start', $date)->get();
        $totalCost = $activities->sum('cost');

        return response()->json(['dayCost' => $totalCost ?? 0]);
    }

    public function checkValidation(Request $request, string $string = ''){

        if($string === 'required'){
            return $request->validate([
                'title' => 'required|string|max:255',
                'start' => ['required', 'date_format:Y-m-d H:i'],
                'end' => ['required', 'date_format:Y-m-d H:i', 'after:start'],
                'description' => 'string',
                'cost' => 'numeric',
            ]);
        }else{
            return $request->validate([
                'title' => 'sometimes|string|max:255',
                'start' => ['sometimes', 'date_format:Y-m-d H:i'],
                'end' => ['sometimes', 'date_format:Y-m-d H:i', 'after:start'],
                'description' => 'string',
                'cost' => 'numeric',
            ]);
        }

    }
}

