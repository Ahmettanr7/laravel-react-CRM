<?php

namespace App\Http\Controllers\api\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Helper\fileUpload;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = request()->user();
        $data = Product::all();

        return response()->json(['success'=>true,'user'=>$user,'data'=>$data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = request()->user();
        $all = $request->all();
        $file = (isset($all['file'])) ? $all['file'] : [];
        unset($all['file']);
        $all['userId'] = $user->id;       
        $create = Product::create($all);

        if ($create) {
            foreach ($file as $item ) {
                $upload = fileUpload::newUpload(rand(1,9000),"products",$item,0);
                ProductImage::create([
                    'productId'=>$create->id,
                    'path'=>$upload
                ]);
            }
            return response()->json([
                'success' => true,
                'message'=> 'Ürün yüklendi'
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message'=> 'Ürün yüklenemedi'
            ]);
        }
            
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = request()->user();
        $control = Product::where('id',$id)->where('userId',$user->id)->count();
        if ($control == 0) { return response()->json(['success'=>false,'message'=>'Ürün size ait değil']); }
        $product = Product::where('id',$id)->first();
        return response()->json([
            'success'=>true,
            'product'=>$product
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = request()->user();
        $control = Product::where('id',$id)->where('userId',$user->id)->count();
        if ($control == 0) { return response()->json(['success'=>false,'message'=>'Ürün size ait değil']); }
        foreach (ProductImage::where('productId',$id)->get() as $item) {
            try {
                unlink(public_path($item->$path));
            } catch (\Exception $e) {}
        }
        ProductImage::where('productId',$id)->delete();
        Product::where('id',$id)->delete();
        return response()->json(['success'=>true,'message'=>'Ürün başarıyla silindi']);
    }
}
