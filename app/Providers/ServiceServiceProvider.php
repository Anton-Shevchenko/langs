<?php

namespace App\Providers;

use App\Contracts\Services\WordServiceInterface;
use App\Services\WordService;
use Illuminate\Support\ServiceProvider;

class ServiceServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(
            WordServiceInterface::class,
            WordService::class
        );
    }
}
