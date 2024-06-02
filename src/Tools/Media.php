<?php

namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Livewire\MediaModal;
use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Tiptap\Nodes\Image as ImageExtension;

class Media extends ScribbleTool
{
    protected function setUp(): void
    {
        $this
            ->icon('scribble-media')
            ->label('Media')
            ->type(ToolType::Block)
            ->commands([
                $this->makeCommand(command: 'setMedia'),
            ])
            ->converterExtensions(new ImageExtension());
    }
}
