<?php

namespace App\Http\Controllers;

use App\Models\SharedUser;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SharedUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function share(Request $request)
    {
        $request->validate([
            'trip_id' => 'required|integer|exists:trips,id'
        ]);

        $trip = Trip::findOrFail($request->input('trip_id'));

        if ($trip->user_id !== auth()->id()) {
            return response()->json(['message' => 'Não permitido: Viagem não pertence a este usuário'], 403);
        }

        if ($trip->share_token) {
            return response()->json(['token' => $trip->share_token], 200);
        }

        $token = Str::random(16);
        $trip->update(['share_token' => $token]);

        return response()->json(['token' => $token], 201);
    }


    public function acceptInvitation(Request $request)
    {
        $request->validate([
            'token' => 'required|string|exists:trips,share_token'
        ]);

        $trip = Trip::where('share_token', $request->input('token'))->first();

        if ($trip->user_id == auth()->id()) {
            return response()->json(['message' => 'Não permitido: O dono da viagem não pode aceitar seu próprio convite'], 403);
        }

        $sharedUser = SharedUser::firstOrNew([
            'trip_id' => $trip->id,
            'user_id' => auth()->id()
        ]);

        if (!$sharedUser->exists) {
            $sharedUser->save();
            $message = 'Convite aceito';
        } else {
            $message = 'Viagem já compartilhada com este usuário';
        }

        return response()->json(['message' => $message]);
    }

    public function deleteShareToken(Request $request)
    {
        $request->validate([
            'trip_id' => 'required|integer|exists:trips,id'
        ]);

        $trip = Trip::findOrFail($request->input('trip_id'));

        if ($trip->user_id !== auth()->id()) {
            return response()->json(['message' => 'Não permitido: Viagem não pertence a este usuário'], 403);
        }

        $trip->update(['share_token' => null]);

        return response()->json(null, 204);
    }
}
