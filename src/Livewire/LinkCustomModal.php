<?php

namespace Awcodes\Scribble\Livewire;

use App\Models\Content;
use App\Models\Movie;
use App\Models\Podcast;
use App\Models\PodcastEpisode;
use App\Models\Topic;
use App\Models\TVShow;
use App\Services\SearchString;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Actions;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Support\Enums\MaxWidth;
use Illuminate\Support\Facades\DB;

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
                    Tabs::make('Link')
                        ->activeTab(fn(Get $get) => $get('href') != '' ? 2 : 1)
                        ->tabs([
                            Tab::make('Link interno')
                                ->schema([
                                    Select::make('model_type')
                                        ->reactive()
                                        ->label('')
                                        ->placeholder('Seleziona il tipo di contenuto che vuoi linkare...')
                                        ->afterStateUpdated(function (Set $set) {
                                            $set('model_id', null);
                                        })
                                        ->options([
                                            Content::class => 'Contenuto',
                                            Movie::class => 'Film',
                                            TVShow::class => 'TV Show',
                                            Podcast::class => 'Podcast',
                                            PodcastEpisode::class => 'Podcast - Episodio',
                                            Topic::class => 'Argomento'
                                        ]),
                                    Select::make('model_id')
                                        ->label('')
                                        ->hidden(fn(Get $get) => !$get('model_type'))
                                        ->reactive()
                                        ->afterStateUpdated(function (Set $set, Get $get, $state) {
                                            if ( $state ) {
                                                $field = $get('model_type') == PodcastEpisode::class || $get('model_type') == Podcast::class || $get('model_type') == Topic::class ? 'name' : 'title';
                                                $set('title', $get('model_type')::where('id', $state)->first()->{$field});
                                                $set('href', null);
                                            }
                                        })
                                        ->placeholder('Cerca e linka un contenuto del sito...')
                                        ->getOptionLabelUsing(function ($value , Get $get) {
                                            $field = $get('model_type') == PodcastEpisode::class || $get('model_type') == Podcast::class || $get('model_type') == Topic::class ? 'name' : 'title';
                                            return $get('model_type')::find($value)?->{$field};
                                        })
                                        ->getSearchResultsUsing(function (string $search, Get $get): array {
                                            list($search_filter, $search_numbers) = SearchString::fullText($search);
                                            $field = $get('model_type') == PodcastEpisode::class || $get('model_type') == Podcast::class || $get('model_type') == Topic::class ? 'name' : 'title';
                                            return $get('model_type')::applyFilters([], [], $search_filter, $search_numbers)->limit(50)->pluck($field, 'id')->toArray();
                                        })
                                        ->searchable(),
                                ]),
                            Tab::make('Link esterno')
                                ->schema([
                                    TextInput::make('href')
                                        ->label('')
                                        ->afterStateUpdated(function (Set $set, $state, TextInput $component) {
                                            if ( $state ) {
                                                // Annullo i campi del link interno
                                                $set('title', '');
                                                $set('model_id', null);
                                            }
                                        })
                                        ->rules([
                                            fn (): Closure => function (string $attribute, $value, Closure $fail) {

                                                $check_url = \ExternalUrlChecker::checkUrl($value, 'links');

                                                if ( !$check_url ) {
                                                    $fail("L'url che hai inserito non è valido. Presenta un errore di stato HTTP. Fai un controllo approfondito");
                                                }
                                            },
                                        ])
                                        ->reactive()
                                        ->placeholder('Inserisci url esterna...')
                                        ->requiredWithout('model_id')
                                        ->url(),
                                ])
                    ]),
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
                        ]),
                ]),
        ];
    }
}
