<?php
namespace Awcodes\Scribble\Modals;

use Awcodes\Scribble\Enums\SlideDirection;
use Awcodes\Scribble\Livewire\ScribbleModal;
use Awcodes\Scribble\Profiles\MinimalProfile;
use Awcodes\Scribble\ScribbleEditor;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Textarea;

class EmbedForm extends ScribbleModal
{
    public ?string $header = 'Embed';

    public static ?SlideDirection $slideDirection = SlideDirection::Right;

    // this should match the identifier in the tool class
    public ?string $identifier = 'embed';

    public function mount(): void
    {
        $this->form->fill([
            'embed' => $this->data['embed'] ?? null
        ]);
    }

    public function getFormFields(): array
    {
        return [
            Textarea::make('embed')
                ->label('Codice di embed')
        ];
    }
}
