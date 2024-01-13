<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $categories = category::all();

            return response()->json([
                'categories' => $categories,
            ]);
        } catch(\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while trying to fetch categories.'
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'sticker' => 'required',
            'category' => 'required',
        ]);

        try {
            $category = category::where('category', $request->category)->firstOrFail();

            return response()->json([
                'message' => 'The category already exists. Please change the name.'
            ], 500);
        } catch (\Exception $e) {
            $category = new category();
            $category->sticker = $request->sticker;
            $category->category = $request->category;
            $category->save();

            return response()->json([
                'message' => 'Category created successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'sticker' => 'required',
            'category' => 'required',
        ]);

        try {
            $category = category::find($id);
            $category->sticker = $request->sticker;
            $category->category = $request->category;
            $category->save();

            return response()->json([
                'message' => 'Category is updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while trying to update category.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(category $category)
    {
        //
        try {
            $category->delete();
            return response()->json([
                'message' => "Category is deleted successfully."
            ]);
        } catch(\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while trying to delete category.'
            ], 500);
        }
    }
}
