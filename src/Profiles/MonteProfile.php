<?php

namespace Awcodes\Scribble\Profiles;

use Awcodes\Scribble\ScribbleManager;
use Awcodes\Scribble\ScribbleProfile;

class MonteProfile extends ScribbleProfile
{
    public static function bubbleTools(): array
    {
        return app(ScribbleManager::class)->getTools([
            'heading-one',
            'heading-two',
            'heading-three',
            'divider',
            'paragraph',
            'bold',
            'highlight',
            'link',
            'italic',
            'code',
            'strike',
            'divider',
            'blockquote',
            'bullet-list',
            'ordered-list',
            'divider',
            'align-start',
            'align-center',
            'align-end'
        ])->toArray();
    }

    public static function suggestionTools(): array
    {
        return app(ScribbleManager::class)->getTools([
            'media-library-image',
            'media-library-gallery',
            'embed',
            'heading-one',
            'heading-three',
            'blockquote',
            'bullet-list',
            'ordered-list',
            'grid',
            'notice',
            'horizontal-rule',
        ])->toArray();
    }

    public static function toolbarTools(): array
    {
        return [];
        return app(ScribbleManager::class)->getTools([
            'heading-two',
            'heading-three',
            'divider',
            'paragraph',
            'bold',
            'italic',
            'strike',
            'subscript',
            'superscript',
            'divider',
            'link',
            'bullet-list',
            'ordered-list',
            'details',
            'grid',
            'blockquote',
            'horizontal-rule',
            'divider',
            'align-start',
            'align-center',
            'align-end',
        ])->toArray();
    }
}
