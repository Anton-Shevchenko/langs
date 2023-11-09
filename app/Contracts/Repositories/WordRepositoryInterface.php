<?php

namespace App\Contracts\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface WordRepositoryInterface
{
    public function allByUserId(int $userId): LengthAwarePaginator;

    public function getRandomWordsByUserIdAndCount(int $userId, int $count): Collection;
}
