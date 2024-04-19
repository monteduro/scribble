<?php
namespace Awcodes\Scribble\Modals;

use AdvancedMediaHandler\Filament\Components\AdvancedMediaPicker;
use AdvancedMediaHandler\Models\Media;
use Awcodes\Scribble\Livewire\ScribbleModal;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Get;
use Filament\Support\Enums\MaxWidth;

class MediaLibraryImage extends ScribbleModal
{
    public ?string $header = 'Immagine';

    // this should match the identifier in the tool class
    public ?string $identifier = 'media-library-image';

    public static ?MaxWidth $maxWidth = MaxWidth::ExtraLarge;

    public function mount(): void
    {
        $this->form->fill([
            'media_id' => $this->data['media_id'] ?? null,
            'caption' => $this->data['caption'] ?? '',
            'html_attributes' => $this->data['html_attributes'] ?? []
        ]);
    }

    public static function closeModalOnEscape(): bool
    {
        return false;
    }

    public function getFormFields(): array
    {
        return [
            AdvancedMediaPicker::make('media_id')
                ->label('')
                ->multiple(false)
                ->required(true)
                ->collection('images'),
            TextInput::make('caption')
                ->label('Didascalia'),
            Section::make('Attributi HTML')
                ->collapsible()
                ->collapsed()
                ->statePath('html_attributes')
                ->schema([
                    TextInput::make('alt')
                        ->placeholder(fn(Get $get) => self::getPlaceholder($get('../media_id'), 'alt') )
                        ->label('Attributo "alt" alternativo')
                        ->helperText('Se vuoto verrà utilizzato l\'attributo alt originale'),
                    TextInput::make('title')
                        ->placeholder(fn(Get $get) => self::getPlaceholder($get('../media_id'), 'title') )
                        ->label('Attributo "title" alternativo')
                        ->helperText('Se vuoto verrà utilizzato l\'attributo alt originale')
                ])
        ];
    }

    public static function getPlaceholder(?int $media_id, string $attribute = 'alt'): string {
        if ( !$media_id ) return '';
        $media_info = Media::find($media_id)->toArray();
        return $media_info[$attribute] ?? '';
    }

}
