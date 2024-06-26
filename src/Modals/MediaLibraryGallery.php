<?php
namespace Awcodes\Scribble\Modals;

use AdvancedMediaHandler\Filament\Components\AdvancedMediaPicker;
use Awcodes\Scribble\Livewire\ScribbleModal;
use Filament\Support\Enums\MaxWidth;

class MediaLibraryGallery extends ScribbleModal
{
    public ?string $header = 'Gallery';

    // this should match the identifier in the tool class
    public ?string $identifier = 'media-library-gallery';

    public static ?MaxWidth $maxWidth = MaxWidth::FiveExtraLarge;

    public function mount(): void
    {
        $this->form->fill([
            'media_ids' => $this->data['media_ids'] ?? []
        ]);
    }

    public static function closeModalOnEscape(): bool
    {
        return false;
    }

    public function getFormFields(): array
    {
        return [
            AdvancedMediaPicker::make('media_ids')
                ->label('')
                ->multiple()
                ->required(true)
                ->collection('images')
        ];
    }

}
