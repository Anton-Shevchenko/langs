<?php

namespace App\Repository;

use Illuminate\Support\Collection;

interface WordRepositoryInterface
{
    public function all(): Collection;
}
