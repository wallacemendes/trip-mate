<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dateTime('start');
            $table->dateTime('end');
            $table->dropColumn('budget');
            $table->dropColumn('time');
            $table->dropColumn('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn('start');
            $table->dropColumn('end');
            $table->string('budget')->nullable();
            $table->string('time')->nullable();
            $table->date('date');
        });
    }
};
