<?php

namespace Awcodes\Scribble\Tiptap\Nodes;
use Tiptap\Utils\HTML;

use Tiptap\Nodes\Image as BaseImage;

class Image extends BaseImage
{
    public function addAttributes(): array
    {
        return [
            'src' => [
                'default' => null,
            ],
            'alt' => [
                'default' => null,
            ],
            'title' => [
                'default' => null,
            ],
            'width' => [
                'default' => null,
            ],
            'height' => [
                'default' => null,
            ],
            'lazy' => [
                'default' => false,
                'parseHTML' => function ($DOMNode) {
                    return $DOMNode->hasAttribute('loading') && $DOMNode->getAttribute('loading') === 'lazy';
                },
                'renderHTML' => function ($attributes) {
                    return $attributes->lazy
                        ? ['loading' => 'lazy']
                        : null;
                },
            ],
        ];
    }

    public function renderHTML($node, $HTMLAttributes = [])
    {

        if ( isset($HTMLAttributes["src"]) ) {

            // Controllo se l'url è valido, altrimenti lo epuro dalla pagina (il metodo gestisce anche i redirect, nel caso)
            $HTMLAttributes["src"] = \ExternalUrlChecker::checkUrl($HTMLAttributes["src"], 'img');

            if ( !$HTMLAttributes["src"] )
                return null;

        }

        return ['img', HTML::mergeAttributes($this->options['HTMLAttributes'], $HTMLAttributes), 0];
    }

}
