<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_orders', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->float('total');
            $table->float('discount');
            $table->tinyInteger('status');
            $table->bigInteger('store_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('order_item_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('order_item_id')->references('id')->on('products_orders')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('store_orders');
    }
}
