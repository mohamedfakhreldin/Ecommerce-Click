<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->unsigned();
            $table->float('price');
            $table->integer('amount');
            $table->string('product_name');
            $table->bigInteger('category_id')->unsigned();
            $table->bigInteger('trademark_id')->unsigned();
            $table->longText('product_description');
            $table->timestamps();
            $table->foreign('store_id')->references('id')->on('stores')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnDelete()->cascadeOnUpdate();
            $table->longText('rejection_reason')->nullable();
            $table->foreign('trademark_id')->references('id')->on('trademarks')->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('status');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
