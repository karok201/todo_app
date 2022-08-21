<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('surveys', static function (Blueprint $table) {
            $table->id();
            $table->string('title', 1000);
            $table->string('slug', 1000);
            $table->tinyInteger('status')->default(false);
            $table->text('description')->nullable();
            $table->foreignIdFor(User::class, 'user_id');
            $table->timestamps();
            $table->timestamp('expire_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
