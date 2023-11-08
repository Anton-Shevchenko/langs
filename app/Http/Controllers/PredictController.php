<?php

namespace App\Http\Controllers;

use App\Models\PredictDutch;

class PredictController extends Controller
{
    private const NL_LANG = "nl";
    private const UK_LANG = "uk";

    public function index(string $lang, string $prefix)
    {

        switch ($lang) {
            case self::NL_LANG:
                $langModel = new PredictDutch;
                break;
            case self::UK_LANG:
                $langModel = new PredictDutch;
                break;
            default:
                return [];
        }

        //TODO to repository
        return $langModel::where("word", "like", "$prefix%")->limit(5)->get();
    }
}
