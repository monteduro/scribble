@php
    $statePath = $getStatePath();
@endphp
<x-dynamic-component :component="$getFieldWrapperView()" :field="$field" class="relative">
    @if ($getCustomStyles())
        <div
            wire:ignore
            x-data="{}"
            x-load-css="[{{ \Illuminate\Support\Js::from($getCustomStyles()) }}]"
        ></div>
    @endif
    <div
        wire:ignore
        x-ignore
        ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('scribble-component', 'awcodes/scribble') }}"
        x-data="scribble(
            @js($getBubbleToolsSchema()),
            @js($getSuggestionToolsSchema()),
            @js($getToolbarToolsSchema()),
            @js($getMergeTags()),
            $wire.{{ $applyStateBindingModifiers("entangle('{$statePath}')", isOptimisticallyLive: false) }},
            @js($statePath),
            @js($getPlaceholder()),
        )"
        x-on:toggle-fullscreen.window="toggleFullscreen($event)"
        x-on:keydown.esc.window="fullscreen = false"
        x-on:click.away="isFocused = false"
        x-bind:class="{'fullscreen': fullscreen, 'focused': isFocused}"
        id="{{ 'scribble-wrapper-' . $statePath }}"
        @class([
            'scribble-wrapper',
            'invalid' => $errors->has($statePath),
        ])
    ></div>
    <div id="scribble-editor-loading-indicator" class="absolute top-0 w-full h-full bg-white/80 dark:bg-gray-900/90 flex z-10 justify-center items-center hidden">
        <x-filament::loading-indicator class="h-8 w-8 text-primary-500 loader" />
    </div>
</x-dynamic-component>
