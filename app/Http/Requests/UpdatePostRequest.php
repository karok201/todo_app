<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $post = $this->route('post');

        if ($this->user()->id !== $post->user_id) {
            return false;
        }

        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'image' => 'nullable|string',
            'title' => 'required|string|max:1000',
            'user_id' => 'exists:users,id',
            'status' => 'required|boolean',
            'short_text' => 'required|string',
            'long_text' => 'required',
        ];
    }
}
