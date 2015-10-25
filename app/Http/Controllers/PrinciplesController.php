<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Storage;

class PrinciplesController extends Controller
{
    public function renderView()
    {
        return view('principles', ['title' => 'Principles', 'bodyClass' => 'principles', 'url' => parent::getMetaUrl(), 'contents' => $this->md()]);
    }

    private function md()
    {
        return Storage::disk('local')->get('markdown/principles.md');
    }
}