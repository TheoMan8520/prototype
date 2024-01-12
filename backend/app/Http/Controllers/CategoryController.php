<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                'message' => 'Record created successfully'
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
    public function update(Request $request, category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(category $category)
    {
        //
    }
}
