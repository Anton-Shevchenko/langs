<?php

namespace App\Providers;

use App\Repository\EloquentRepositoryInterface;
use App\Repository\WordRepositoryInterface;
use App\Repository\Eloquent\WordRepository;
use App\Repository\Eloquent\BaseRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(WordRepositoryInterface::class, WordRepository::class);
    }
}
