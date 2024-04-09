<?php

namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Closure;
use Tiptap\Nodes\Blockquote as BlockquoteExtension;

class Blockquote extends ScribbleTool
{

    protected string | Closure | null $description = 'Blocco per citazione';

    protected function setUp(): void
    {
        $this
            ->icon('scribble-blockquote')
            ->label('Blockquote')
            ->extension('blockquote')
            ->active(extension: 'blockquote')
            ->commands([
                $this->makeCommand(command: 'toggleBlockquote'),
            ])
            ->converterExtensions(new BlockquoteExtension());
    }
}
