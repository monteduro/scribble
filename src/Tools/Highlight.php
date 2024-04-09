<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Tiptap\Marks\Highlight as TiptapHighlight;

class Highlight extends ScribbleTool
{
    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-fire')
            ->label('Highlight')
            ->commands([
                $this->makeCommand(command: 'toggleHighlight'),
            ])
            ->converterExtensions(new TiptapHighlight());
    }
}
