<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Modals\MediaLibraryForm;
use Closure;

class MediaLibrary extends ScribbleTool
{

    protected string | null $identifier = 'media-library';

    protected string | Closure | null $description = 'Aggiungi elementi dalla Media Libray';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-archive-box-arrow-down')
            ->label('Media')
            ->type(ToolType::Block)
            ->optionsModal(MediaLibraryForm::class)
            ->renderedView('scribble::tools.media-library');
    }
}
