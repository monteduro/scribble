<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Modals\MediaLibraryImage as MediaLibraryImageForm;
use Closure;

class MediaLibraryImage extends ScribbleTool
{

    protected string | null $identifier = 'media-library-image';

    protected string | Closure | null $description = 'Aggiungi un\'immagine';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-photo')
            ->label('Immagine')
            ->type(ToolType::Block)
            ->optionsModal(MediaLibraryImageForm::class)
            ->editorView('scribble::tools.editor.media-library-image')
            ->renderedView('scribble::tools.media-library-image');
    }
}
