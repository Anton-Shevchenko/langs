<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWordRequest;
use App\Http\Requests\UpdateWordRequest;
use App\Models\Word;
use App\Repository\WordRepositoryInterface;
use Inertia\Inertia;

class WordController extends Controller
{
    private const VIEW_COMPONENT = "WordList";

    public function __construct(protected WordRepositoryInterface $wordRepository) {}

    public function index()
    {
        return Inertia::render(self::VIEW_COMPONENT, ["words" => $this->wordRepository->all()]);
    }

    public function create()
    {
        //
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
            'translation' => 'trans',
        ]);

        return redirect()->route('words.index')
            ->with('success', 'Word created successfully.');
    }
    public function show(Word $word)
    {
        //
    }

    public function edit(Word $word)
    {
        //
    }

    public function update(UpdateWordRequest $request, Word $word)
    {
        //
    }

    public function destroy(Word $word)
    {
        $word->delete();

        return redirect()->route('words.index')
            ->with('success', 'Word deleted successfully');
    }
}
