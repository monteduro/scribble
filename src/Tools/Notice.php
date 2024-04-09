<?php
namespace Awcodes\Scribble\Tools;

use Awcodes\Scribble\ScribbleTool;
use Awcodes\Scribble\Enums\ToolType;
<<<<<<< HEAD
<<<<<<< HEAD
use Awcodes\Scribble\Modals\NoticeForm;
use Closure;
=======
use Closure;
use FilamentMisc\Modals\NoticeForm;
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
use Awcodes\Scribble\Modals\NoticeForm;
use Closure;
>>>>>>> cf8a066 (refacot: some refactoring)

class Notice extends ScribbleTool
{

    protected string | null $identifier = 'notice';

    protected string | Closure | null $description = 'Blocco per warning';

    protected function setUp(): void
    {
        $this
            ->icon('heroicon-o-exclamation-triangle')
            ->label('Notice')
            ->type(ToolType::Block)
            ->optionsModal(NoticeForm::class)
            ->renderedView('scribble::tools.notice');
    }
}
