<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|max:255|required',
            'genre' => 'string|max:255|nullable',
            'publication_date' => 'date|nullable',
            'language' => 'nullable|string|max:255',
            'author' => 'array',
            'author.*' => 'exists:authors,id'
        ];
    }
}
