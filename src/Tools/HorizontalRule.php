<?php

namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Closure;
use Tiptap\Nodes\HorizontalRule as HorizontalRuleExtension;

class HorizontalRule extends ScribbleTool
{

    protected string | Closure | null $description = 'Separatore orizzontale';

    protected function setUp(): void
    {
        $this
            ->icon('scribble-hr')
            ->label('Horizontal Rule')
            ->extension('horizontalRule')
            ->commands([
                $this->makeCommand(command: 'setHorizontalRule'),
            ])
            ->converterExtensions(new HorizontalRuleExtension());
    }
}
