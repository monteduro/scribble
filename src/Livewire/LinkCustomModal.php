<?php

namespace Awcodes\Scribble\Livewire;

use App\Models\Content;
use App\Models\Movie;
use Filament\Forms;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use Filament\Support\Enums\MaxWidth;

class LinkCustomModal extends ScribbleModal
{
    public ?string $header = 'Link';

    public static ?MaxWidth $maxWidth = MaxWidth::Large;

    public function getFormFields(): array
    {
        return [
            Forms\Components\Grid::make()
                ->columns(1)
                ->schema([
                    Select::make('internal_id')
                        ->label('')
                        ->placeholder('Cerca e linka un contenuto del sito...')
                        ->getSearchResultsUsing(fn (string $search): array => Content::where('title', 'like', "%{$search}%")->limit(3)->pluck('title', 'id')->toArray())
                        ->searchable(),
                    TextInput::make('href')
                        ->label('')
                        ->placeholder('Inserisci url esterna...')
                        ->requiredWithout('internal_id')
                        ->validationAttribute('URL'),
                    Toggle::make('target')
                        ->label('Apri in una nuova finestra'),
                    Section::make('Attributi aggiuntivi')
                        ->collapsed()
                        ->compact()
                        ->schema([
                            Toggle::make('rel')
                                ->default(false)
                                ->label('Impesici ai motori di ricerca di seguire questo link'),
                            TextInput::make('title')
                                ->label('Titolo')
                        ])

                ]),
        ];
    }
}
