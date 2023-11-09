<?php

namespace App\Http\Requests;

use App\Enums\Langs;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreWordRequest extends FormRequest
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
            'value' => 'required|max:100',
            'value_lang' => [Rule::enum(Langs::class)],
            'translation' => 'required|max:100',
            'translation_lang' => [Rule::enum(Langs::class)],
        ];
    }
}
