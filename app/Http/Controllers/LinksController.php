<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Storage;

class LinksController extends Controller
{
    public function renderView()
    {
        return view('links', ['title' => 'Links', 'bodyClass' => 'links', 'url' => parent::getMetaUrl(), 'contents' => $this->md()]);
    }

    private function md()
    {
        return Storage::disk('local')->get('markdown/links.md');
    }
}