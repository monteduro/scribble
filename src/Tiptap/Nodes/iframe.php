<?php

namespace Awcodes\Scribble\Tiptap\Nodes;

use Tiptap\Core\Node;
use Tiptap\Utils\HTML;

class iframe extends Node
{
    public static $name = 'iframe';

    public function addOptions(): array
    {
        return [
            'HTMLAttributes' => [],
        ];
    }

    public function parseHTML(): array
    {
        return [
            [
                'tag' => 'iframe[src]',
            ],
        ];
    }

    public function addAttributes()
    {
        return [
            'frameborder' => null,
            'name' => null,
            'width' => null,
            'height' => null,
            'frameborder' => null,
            'scrolling' => null,
            'src' => null,
            'allowfullscreen' => null
        ];
    }

    public function renderHTML($mark, $HTMLAttributes = [])
    {

        if ( isset($HTMLAttributes["src"]) ) {

            // Controllo se l'url è valido, altrimenti lo epuro dalla pagina (il metodo gestisce anche i redirect, nel caso)
            $HTMLAttributes["src"] = \ExternalUrlChecker::checkUrl($HTMLAttributes["src"], 'embed');

            if ( !$HTMLAttributes["src"] )
                return null;

        }

        return [
            'iframe',
            HTML::mergeAttributes($this->options['HTMLAttributes'], $HTMLAttributes),
            0,
        ];
    }
}
