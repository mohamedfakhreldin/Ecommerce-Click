<?php

namespace Tests\Unit;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    private $response;
    public function setUp() :void {
        parent::setUp();
        $this->response=\App\StoreOrder::select('user_id')->leftJoin('products_orders','store_orders.id','=','products_orders.store_order_id')
        ->where('user_id',4)->where('product_id',12)->exists();





    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
    echo $this->assertTrue($this->response);
    }

    public function tearDown() :void {
        parent::tearDown();


    }
}
