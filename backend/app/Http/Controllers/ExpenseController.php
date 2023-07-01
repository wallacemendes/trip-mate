<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExpenseCollection;
use App\Http\Resources\ExpenseResource;
use App\Models\Activity;
use App\Models\Trip;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Trip $trip, Activity $activity)
    {
        if ($activity->trip_id !== $trip->id) {
            return response()->json(['message' => 'Activity not found for the specified trip'], 404);
        }
        if ($activity->expenses()->count() === 0) {
            return response()->json(['message' => 'No expenses found'], 404);
        }
        return new ExpenseCollection($activity->expenses);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Trip $trip, Activity $activity, Request $request)
    {
        $inputValidation = $request->validate([
            'description' => 'string|max:255',
            'amount' => 'required|numeric'
        ]);

        $expense = $activity->expenses()->create([
            'description' => optional($inputValidation)['description'],
            'amount' => $inputValidation['amount'],
        ]);

        return response()->json($expense, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip, Activity $activity, Expense $expense)
    {
        if ($expense->activity_id !== $activity->id) {
            return response()->json(['message' => 'Expense not found for the specified activity'], 404);
        }
        return new ExpenseResource($expense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Trip $trip, Activity $activity, Expense $expense, Request $request)
    {
        $method = $request->input('_method');

        if ($method === 'PUT') {
            $inputValidation = $request->validate([
                'description' => 'string|max:255',
                'amount' => 'required|numeric'
            ]);
        } else {
            $inputValidation = $request->validate([
                'description' => 'sometimes|nullable|string|max:255',
                'amount' => 'sometimes|numeric'
            ]);
        }

        $expense->update($inputValidation);

        return response()->json(['message' => 'Expense updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip, Activity $activity, Expense $expense)
    {
        if ($expense->activity_id !== $activity->id) {
            return response()->json(['message' => 'Expense not found for the specified trip'], 404);
        }

        $expense->delete();
        return response()->json(['message' => 'Expense deleted successfully']);
    }
}
