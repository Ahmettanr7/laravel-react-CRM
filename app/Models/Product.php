<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'categoryId',
        'name',
        'modelCode',
        'barcode',
        'brand',
        'stock',
        'text',
        'buyingPrice',
        'sellingPrice',
        'taxPrice'
    ];

    public function category(){
        return $this->HasMany(Category::class,'id','categoryId');
    }

    public function property(){
        return $this->HasMany(ProductProperty::class,'productId','id');
    }

    public function images (){
        return $this->HasMany(ProductImage::class,'productId','id');
    }
}
