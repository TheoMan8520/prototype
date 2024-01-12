<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\preset;
use App\Models\record;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RecordController extends Controller
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
        $request->validate([
            'day' => 'required',
            'month' => 'required',
            'year' => 'required',
            'content' => 'required',
            'sticker' => 'required',
            'category' => 'required',
            'preset' => 'nullable',
        ]);

        try {
            $record = new record();
            $record->content = $request->content;
            $record->day = $request->day;
            $record->month = $request->month;
            $record->year = $request->year;

            $category = category::where('category', $request->category)->first();
            if (!$category) {
                $category = new category();
            }
            $category->sticker = $request->sticker;
            $category->category = $request->category;
            $category->save();

            $record->category_id = $category->id;

            if ($request->has('preset')) {
                $preset = preset::where('name', $request->preset)->first();
                if (!$preset) {
                    $preset = new preset();
                }
                $preset->name = $request->preset;
                $preset->content = $request->content;
                $preset->category_id = $category->id;
                $preset->save();
                $record->preset_id = $preset->id;
            }

            $record->save();

            return response()->json([
                'message' => 'Record created successfully'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while trying to create record.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(record $record)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(record $record)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, record $record)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(record $record)
    {
        //
    }

    public function getRecordOfDay($day, $month, $year)
    {
        try {
            $records = record::where('day', $day)
                ->where('month', $month)
                ->where('year', $year)
                ->get();

            return response()->json([
                'records' => $records,
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while trying to fetch records.'
            ], 500);
        }
    }
}
