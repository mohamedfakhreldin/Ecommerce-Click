<?php

use App\Product as AppProduct;
use Illuminate\Database\Seeder;

class product extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       App\Product::insert([
            'name'=>'iphone Product',
            'store_id'=>'2',
            'category_id'=>'12',
            'trademark_id'=>'2',
            'price'=>'15000',
            'product_description'=>"Iprone 11 plus 32GB RAM 256GB Storage 64MP Camera Gold "
        ]);
    }
}
