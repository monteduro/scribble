<?php

namespace Awcodes\Scribble\Tiptap\Marks;

use App\Models\Content;
use App\Models\Movie;
use App\Models\TVShow;
use Tiptap\Marks\Link as BaseLink;
use Tiptap\Utils\HTML;

class LinkCustom extends BaseLink
{
    public function addOptions(): array
    {
        return [
            'openOnClick' => true,
            'linkOnPaste' => true,
            'autoLink' => true,
            'protocols' => [],
            'HTMLAttributes' => [],
            'validate' => 'undefined',
        ];
    }

    public function renderHTML($mark, $HTMLAttributes = [])
    {

        ## Controllo se è un link interno
        ## @TODO gestire bene questa parte con slug generati con qualche service o facade
        if ( isset($HTMLAttributes["model_type"]) && isset($HTMLAttributes["model_id"]) ) {

            switch ($HTMLAttributes["model_type"]) {

                case Content::class:
                    $content = Content::find($HTMLAttributes["model_id"]);
                    $HTMLAttributes["href"] = '/'.$content->section->slug.'/'.$content->slug;
                    break;

                case Movie::class:
                    $content = Movie::find($HTMLAttributes["model_id"]);
                    $HTMLAttributes["href"] = '/film/'.$content->id;
                    break;

                case TVShow::class:
                    $content = TVShow::find($HTMLAttributes["model_id"]);
                    $HTMLAttributes["href"] = '/tv/'.$content->id;
                    break;

            }


        }

        ## Target
        if ( isset($HTMLAttributes["target"]) ) {
            $HTMLAttributes["target"] = $HTMLAttributes["target"] ? '_blank' : null;
        }

        return [
            'a',
            HTML::mergeAttributes($this->options['HTMLAttributes'], $HTMLAttributes),
            0,
        ];
    }

    public function addAttributes(): array
    {
        return [
            'href' => [
                'default' => null,
            ],
            'target' => [
                'default' => $this->options['HTMLAttributes']['target'] ?? null,
            ],
            'model_type' => [
                'default' => null,
            ],
            'model_id' => [
                'default' => null,
            ],
            'rel' => [
                'default' => null,
            ],
            'title' => [
                'default' => null,
            ],
        ];
    }
}
