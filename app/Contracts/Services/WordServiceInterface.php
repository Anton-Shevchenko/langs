<?php

namespace App\Contracts\Services;

interface WordServiceInterface
{
    public function getTestByUserId(int $userId): array;
}
