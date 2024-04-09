<?php
namespace Awcodes\Scribble\Modals;

use Awcodes\Scribble\Enums\SlideDirection;
use Awcodes\Scribble\Livewire\ScribbleModal;
use Awcodes\Scribble\Profiles\MinimalProfile;
use Awcodes\Scribble\ScribbleEditor;
use Filament\Forms\Components\Radio;

class NoticeForm extends ScribbleModal
{
    public ?string $header = 'Notice';

    public static ?SlideDirection $slideDirection = SlideDirection::Right;

    // this should match the identifier in the tool class
    public ?string $identifier = 'notice';

    public function mount(): void
    {
        $this->form->fill([
            'color' => $this->data['color'] ?? 'info',
            'body' => $this->data['body'] ?? null,
        ]);
    }

    public function getFormFields(): array
    {
        return [
            Radio::make('color')
                ->inline()
                ->inlineLabel(false)
                ->options([
                    'info' => 'Info',
                    'success' => 'Success',
                    'warning' => 'Warning',
                    'danger' => 'Danger',
                ]),
            ScribbleEditor::make('body')
                ->profile(MinimalProfile::class)
                ->columnSpanFull(),
        ];
    }
}
