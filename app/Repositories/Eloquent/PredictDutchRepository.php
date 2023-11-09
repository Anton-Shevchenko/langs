<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\PredictRepositoryInterface;
use App\Models\PredictDutch;
use Illuminate\Support\Collection;

class PredictDutchRepository extends BaseRepository implements PredictRepositoryInterface
{
    private const DEFAULT_PREDICT_LIMIT = 5;

    public static function getPredictsByPrefix(string $prefix): Collection
    {
        return PredictDutch::where("word", "like", "$prefix%")->limit(self::DEFAULT_PREDICT_LIMIT)->get();
    }
}
