<?php

namespace Awcodes\Scribble\Tiptap\Nodes;

use Tiptap\Core\Node;
use Tiptap\Utils\HTML;

class Script extends Node
{
    public static $name = 'script';

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
                'tag' => 'script[src]',
            ],
        ];
    }

    public function addAttributes()
    {
        return [
            'async' => null,
            'charset' => null,
            'src' => null
        ];
    }

    public function renderHTML($mark, $HTMLAttributes = [])
    {
        return [
            'script',
            HTML::mergeAttributes($this->options['HTMLAttributes'], $HTMLAttributes),
            0,
        ];
    }
}
