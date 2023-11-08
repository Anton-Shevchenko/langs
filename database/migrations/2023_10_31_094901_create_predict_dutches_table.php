<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $primaryKey = 'word';
    protected $keyType = 'string';
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('predict_dutches', function (Blueprint $table) {
            $table->string("word");
            $table->unique("word");
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('predict_dutches');
    }
};
