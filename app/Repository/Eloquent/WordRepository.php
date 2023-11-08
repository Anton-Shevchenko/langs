<?php

namespace App\Repository\Eloquent;

use App\Models\Word;
use App\Repository\WordRepositoryInterface;
use Illuminate\Support\Collection;

class WordRepository extends BaseRepository implements WordRepositoryInterface
{
    public function __construct(Word $model)
    {
        parent::__construct($model);
    }

    public function all(): Collection
    {
        return $this->model->all();
    }
}
