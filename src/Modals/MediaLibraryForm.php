<?php
namespace Awcodes\Scribble\Modals;

use AdvancedMediaHandler\Filament\Components\AdvancedMediaPicker;
use AdvancedMediaHandler\Filament\Components\AdvancedMediaPicker2;
use Awcodes\Scribble\Enums\SlideDirection;
use Awcodes\Scribble\Livewire\ScribbleModal;
use Filament\Support\Enums\MaxWidth;

class MediaLibraryForm extends ScribbleModal
{
    public ?string $header = 'Media Library';

    // this should match the identifier in the tool class
    public ?string $identifier = 'media-library';

    public static ?SlideDirection $slideDirection = SlideDirection::Right;

    public static ?MaxWidth $maxWidth = MaxWidth::SevenExtraLarge;

    public function mount(): void
    {
        \Log::info($this->data);
        $this->form->fill([
            'media_ids' => $this->data['media_ids'] ?? []
        ]);
    }

    public function getFormFields(): array
    {
        return [
            AdvancedMediaPicker2::make('media_ids')
                ->multiple()
                ->collection('images')
        ];
    }
}
