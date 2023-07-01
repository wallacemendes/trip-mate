<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;


class UpdateTripRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $method = $this->method();
        if ($method == 'PUT') {
            return [
                'title' => 'required|string',
                'startDate' => 'required|date',
                'endDate' => 'required|date',
                'location' => 'string',
                'currency' => 'required|string|size:3|in:BRL,USD,EUR',
                'budget' => 'numeric',
            ];
        } else {
            return [
                'title' => 'sometimes|required|string',
                'startDate' => 'sometimes|required|date',
                'endDate' => 'sometimes|required|date',
                'location' => 'sometimes|string',
                'currency' => 'sometimes|required|string|size:3|in:BRL,USD,EUR',
                'budget' => 'sometimes|numeric',
            ];
        }
    }

    protected function prepareForValidation()
    {
        try {
            Validator::make($this->all(), [
                'startDate' => [
                    'required',
                    'date',
                    function ($attribute, $value, $fail) {
                        if ($value > $this->endDate) {
                            $fail($attribute . ' is after end date.');
                        }
                    },
                ],
                'endDate' => 'required|date',
            ])->validate();
        } catch (ValidationException $e) {
            echo "Error: " . $e->getMessage();
        }

        if ($this->startDate) {
            $this->merge([
                'start_date' => $this->startDate
            ]);
        }
        if ($this->endDate) {
            $this->merge([
                'end_date' => $this->endDate
            ]);
        }
    }
}
