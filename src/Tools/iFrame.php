<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Tiptap\Nodes\iframe as NodesIframe;
use Closure;

class iFrame extends ScribbleTool
{

    protected string | null $identifier = 'iframe';

    protected string | Closure | null $description = 'iFrame';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-code-bracket')
            ->label('iFrame')
            ->extension('iframe')
            ->type(ToolType::Block)
            ->renderedView('scribble::tools.iframe')
            ->converterExtensions(new NodesIframe());
    }
}
