<?php

namespace App\Http\Controllers;

use App\Enums\Langs;
use App\Services\PredictService;

class PredictController extends Controller
{
    public function __construct(protected PredictService $predictService) {}

    public function index(Langs $lang, string $prefix)
    {
        return $this->predictService->getPredictOptionsByPrefix($prefix, $lang);
    }
}
