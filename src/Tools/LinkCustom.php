<?php

namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Livewire\LinkCustomModal;
use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Tiptap\Marks\LinkCustom as LinkExtension;

class LinkCustom extends ScribbleTool
{
    protected string | null $identifier = 'link';

    protected function setUp(): void
    {
        $this
            ->icon('scribble-link')
            ->label('Link')
            ->type(ToolType::Modal)
            ->commands([
                $this->makeCommand(command: 'extendMarkRange', arguments: 'link'),
                $this->makeCommand(command: 'setLink'),
                $this->makeCommand(command: 'moveToEnd'),
            ])
            ->optionsModal(component: LinkCustomModal::class)
            ->converterExtensions(new LinkExtension());
    }
}
