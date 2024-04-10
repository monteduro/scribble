<?php

namespace Awcodes\Scribble\Tiptap\Marks;

use Tiptap\Marks\Link as BaseLink;

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

    public function addAttributes(): array
    {
        return [
            'href' => [
                'default' => null,
            ],
            'target' => [
                'default' => $this->options['HTMLAttributes']['target'] ?? null,
            ],
            'internal_id' => [
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
