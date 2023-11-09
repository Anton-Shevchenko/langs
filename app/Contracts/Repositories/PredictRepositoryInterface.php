<?php

namespace App\Contracts\Repositories;

use Illuminate\Support\Collection;

interface PredictRepositoryInterface
{
    public static function getPredictsByPrefix(string $prefix): Collection;
}
