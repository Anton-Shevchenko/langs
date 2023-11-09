<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Repositories\WordRepositoryInterface;
use App\Contracts\Services\WordServiceInterface;
use App\Models\Word;
use Illuminate\Support\Collection;

class WordService implements WordServiceInterface
{
    const DEFAULT_QUESTIONS_COUNT_PER_TEST = 6;
    const DEFAULT_ANSWERS_COUNT_PER_QUESTION = 4;

    public function __construct(public WordRepositoryInterface $wordRepository) {}

    public function getTestByUserId(int $userId): array
    {
        // count limited for simplifying the test with the same options
        return $this->buildTest($this->wordRepository->getRandomWordsByUserIdAndCount(
            $userId,
            self::DEFAULT_QUESTIONS_COUNT_PER_TEST * self::DEFAULT_ANSWERS_COUNT_PER_QUESTION
        ));
    }

    private function buildTest(Collection $collection): array
    {
        if ($collection->count() <= 1) {
            return [];
        }

        $test = [];
        $questions = $collection->random(self::DEFAULT_QUESTIONS_COUNT_PER_TEST);

        foreach ($questions as $question) {
            $test[] = $this->fillTest($collection, $question);
        }

        return $test;
    }

    private function fillTest(Collection $collection, Word $question): Word
    {
        $attr = $question->getAttribute('translation');
        $translates = $collection->pluck('translation');

        $checked = $translates->filter(function (string $value) use ($attr) {
            return $value !== $attr;
        });

        $options = $checked->random(self::DEFAULT_ANSWERS_COUNT_PER_QUESTION - 1);
        $question['options'] = $options->add($attr)->shuffle();

        return $question;
    }
}
