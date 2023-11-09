<?php

declare(strict_types=1);

namespace App\Contracts\Services;

use App\Enums\Langs;
use Illuminate\Support\Collection;

interface PredictServiceInterface
{
    public function getPredictOptionsByPrefix(string $prefix, Langs $lang): Collection;
}
