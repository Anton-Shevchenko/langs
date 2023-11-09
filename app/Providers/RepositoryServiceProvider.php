<?php

namespace App\Providers;

use App\Contracts\Repositories\EloquentRepositoryInterface;
use App\Contracts\Repositories\WordRepositoryInterface;
use App\Repositories\Eloquent\BaseRepository;
use App\Repositories\Eloquent\WordRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(WordRepositoryInterface::class, WordRepository::class);
    }
}
