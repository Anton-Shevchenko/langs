<?php

namespace App\Console\Commands;

use App\Models\PredictDutch;
use Illuminate\Console\Command;

class FillDutchWordList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fill-dutch-word-list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // PredictDutch::truncate(); to clean old list
        $list = fopen("public/predicts/dutch.txt", "r") or die("Unable to open file!");

        while (!feof($list)) {
            $word = fgets($list);
            if ($word !== "") {
                try {
                    PredictDutch::create([
                        'word' => trim($word),
                    ]);
                } catch (\Exception) {
                    echo "duplicate " . $word;
                }
            }

        }
        fclose($list);
    }
}
