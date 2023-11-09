<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Repositories\WordRepositoryInterface;
use App\Contracts\Services\WordServiceInterface;
use App\Models\Word;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;

class WordService implements WordServiceInterface
{
    const DEFAULT_QUESTIONS_COUNT_PER_TEST = 4;
    const DEFAULT_ANSWERS_COUNT_PER_QUESTION = 4;

    public function __construct(public WordRepositoryInterface $wordRepository) {}

    public function getTestByUserId(int $userId): array
    {
        return $this->buildTest($this->wordRepository->getRandomWordsByUserIdAndCount(
            $userId,
            self::DEFAULT_QUESTIONS_COUNT_PER_TEST * self::DEFAULT_ANSWERS_COUNT_PER_QUESTION
        ));
    }

    private function buildTest(Collection $collection): array
    {
        $test = [];
        $chunks = array_chunk($collection->toArray(), self::DEFAULT_ANSWERS_COUNT_PER_QUESTION);

        foreach ($chunks as $chunk) {
            if (count($chunk) < self::DEFAULT_ANSWERS_COUNT_PER_QUESTION) {
                break;
            }
            $questionIndex = array_rand($chunk);
            $question = $chunk[$questionIndex];
            $question['options'] = Arr::pluck($chunk, 'translation');
            $test[] = $question;
        }

        return $test;
    }
}
