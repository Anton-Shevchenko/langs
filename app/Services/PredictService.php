<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\Repositories\PredictRepositoryInterface;
use App\Contracts\Services\PredictServiceInterface;
use App\Enums\Langs;
use App\Repositories\Eloquent\PredictDutchRepository;
use Illuminate\Support\Collection;

class PredictService implements PredictServiceInterface
{
    public function getPredictOptionsByPrefix(string $prefix, Langs $lang): Collection {
        /**
         * @var $repo PredictRepositoryInterface
         **/
        $repo = $this->getModelByLangName($lang);

        return $repo::getPredictsByPrefix($prefix);
    }

    private function getModelByLangName(Langs $lang): string
    {
        switch ($lang) {
            case Langs::NL_LANG:
                return PredictDutchRepository::class;
            default:
                abort(404);
        }
    }
}
