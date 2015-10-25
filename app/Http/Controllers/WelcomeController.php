<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Storage;

class WelcomeController extends Controller
{
    public function renderView()
    {
        return view('welcome', ['title' => 'Welcome', 'bodyClass' => 'welcome', 'url' => parent::getMetaUrl(), 'contents' => $this->md()]);
    }

    private function md()
    {
        return Storage::disk('local')->get('markdown/index.md');
    }
}