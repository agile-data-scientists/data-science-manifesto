<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use VTalbot\Markdown\Facades\Markdown;

class AboutController extends Controller
{
    public function renderView()
    {
        return view('about', ['title' => 'About Us', 'bodyClass' => 'about', 'url' => parent::getMetaUrl(), 'contents' => $this->md()]);
    }

    private function md() {
        return Markdown::make('about');
    }
}