<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
use Awcodes\Scribble\Modals\EmbedForm;
use Closure;

class Embed extends ScribbleTool
{

    protected string | null $identifier = 'embed';

    protected string | Closure | null $description = 'Embed di elementi esterni';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-code-bracket')
            ->label('Embed')
            ->type(ToolType::Block)
            ->optionsModal(EmbedForm::class)
            ->renderedView('scribble::tools.embed');
    }
}
