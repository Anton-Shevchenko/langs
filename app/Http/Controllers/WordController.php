<?php

namespace App\Http\Controllers;

use App\Contracts\Repositories\WordRepositoryInterface;
use App\Contracts\Services\WordServiceInterface;
use App\Http\Requests\StoreWordRequest;
use App\Http\Requests\UpdateWordRequest;
use App\Models\Word;
use Inertia\Inertia;

class WordController extends Controller
{
    private const LIST_VIEW = "WordList";
    private const TEST_VIEW = "Test";

    public function __construct(
        protected WordRepositoryInterface $wordRepository,
        protected WordServiceInterface $wordService,
    ) {}

    public function index()
    {
        return Inertia::render(
            self::LIST_VIEW,
            [
                "words" => $this->wordRepository->allByUserId(auth()->id())
            ]
        );
    }

    public function store(StoreWordRequest $request)
    {
        $request->validate([
            'value' => 'required|max:255',
        ]);

        Word::create([
            'value' => $request['value'],
            'user_id' => auth()->id(),
            'value_lang' => 'ru',
            'translation_lang' => 'ru',
            'translation' => $request['translation'],
        ]);

        return redirect()->route('words.index')
            ->with('success', 'Word created successfully.');
    }

    public function destroy(Word $word)
    {
        $word->delete();

        return redirect()->route('words.index')
            ->with('success', 'Word deleted successfully');
    }

    public function test()
    {
        return Inertia::render(
            self::TEST_VIEW,
            [
                "tests" => $this->wordService->getTestByUserId(auth()->id())
            ]
        );
    }
}
