<?php
namespace Awcodes\Scribble\Modals;

use Awcodes\Scribble\Enums\SlideDirection;
use Awcodes\Scribble\Livewire\ScribbleModal;
use Filament\Forms\Components\TextInput;

class EmbedForm extends ScribbleModal
{
    public ?string $header = 'Incorporamento';

    // this should match the identifier in the tool class
    public ?string $identifier = 'embed';

    public function mount(): void
    {
        $this->form->fill([
            'url' => $this->data['url'] ?? null
        ]);
    }

    public function getFormFields(): array
    {
        return [
            TextInput::make('url')
                ->url()
                ->label('URL da incorporare')
        ];
    }
}
