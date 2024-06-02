<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Tiptap\Nodes\Script as NodesIframe;
use Closure;

class Script extends ScribbleTool
{

    protected string | null $identifier = 'script';

    protected string | Closure | null $description = 'Script';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-code-bracket')
            ->label('Script')
            ->type(ToolType::Block)
            ->converterExtensions(new NodesIframe());
    }
}
