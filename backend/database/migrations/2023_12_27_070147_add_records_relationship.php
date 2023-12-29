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
        Schema::table('records', function (Blueprint $table) {
            $table->foreignId('category_id')
                ->constrained('categories');
            $table->foreignId('preset_id')
                ->constrained('presets')
                ->nullable();
            $table->foreignId('day_id')
                ->constrained('days')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('records', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
            $table->dropForeign(['preset_id']);
            $table->dropColumn('preset_id');
            $table->dropForeign(['day_id']);
            $table->dropColumn('day_id');
        });
    }
};
