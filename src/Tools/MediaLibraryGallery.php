<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Modals\MediaLibraryGallery as MediaLibraryGalleryForm;
use Closure;

class MediaLibraryGallery extends ScribbleTool
{

    protected string | null $identifier = 'media-library-gallery';

    protected string | Closure | null $description = 'Aggiungi una galleria di immagini';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-square-2-stack')
            ->label('Gallery')
            ->type(ToolType::Block)
            ->optionsModal(MediaLibraryGalleryForm::class)
            ->editorView('scribble::tools.editor.media-library-gallery')
            ->renderedView('scribble::tools.media-library-gallery');
    }
}
