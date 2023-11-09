<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\WordRepositoryInterface;
use App\Models\Word;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class WordRepository extends BaseRepository implements WordRepositoryInterface
{
    const DEFAULT_PAGINATION_COUNT = 10;

    public function __construct(Word $model)
    {
        parent::__construct($model);
    }

    public function allByUserId(int $userId): LengthAwarePaginator
    {
        return $this->model->where('user_id', $userId)->orderBy('id', 'desc')->paginate(self::DEFAULT_PAGINATION_COUNT);
    }

    public function getRandomWordsByUserIdAndCount(int $userId, int $count): Collection
    {
        return $this->model->where('user_id', $userId)->orderBy(DB::raw('RAND()'))->limit($count)->get();
    }
}
