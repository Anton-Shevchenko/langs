<?php

namespace App\Contracts\Repositories;

use Illuminate\Database\Eloquent\Model;

interface EloquentRepositoryInterface
{
    public function create(array $attributes): Model;

    public function find($id): ?Model;
}
