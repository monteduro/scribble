<?php

namespace Awcodes\Scribble\Tiptap\Nodes;

use Tiptap\Core\Node;
use Tiptap\Utils\HTML;

class Embed extends Node
{
    public static $name = 'embed';

    public function addOptions(): array
    {
        return [
            'HTMLAttributes' => [],
        ];
    }

    public function addAttributes()
    {
        return [
            'type' => null,
            'width' => null,
            'height' => null,
            'allowScriptAccess' => null,
            'src' => null
        ];
    }

    public function parseHTML(): array
    {
        return [
            [
                'tag' => 'embed',
            ],
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
            'embed',
            HTML::mergeAttributes($this->options['HTMLAttributes'], $HTMLAttributes),
            0,
        ];
    }
}
