<?php

namespace Awcodes\Scribble;

use Filament\Support\Components\Component;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ScribbleManager extends Component
{
    protected array | null $tools = null;

    protected array | null $customTools = null;

    public function registerTools(array $tools): static
    {
        $this->customTools = $tools;

        return $this;
    }

    public function tools(array $tools): static
    {
        $this->tools = $tools;
        return $this;
    }

    public function getRegisteredTools(): Collection
    {
        return collect([...$this->tools ?? $this->getDefaultTools(), ...$this->customTools ?? []])
            ->mapWithKeys(function ($tool) {
                return [$tool->getIdentifier() => $tool];
            });
    }

    public function getTools(array | string $tools): Collection
    {
        $tls = collect();

        $tools = Arr::wrap($tools);

        foreach ($tools as $tool) {
            $tls->push($this->getRegisteredTools()->only($tool)->sole());
        }

        return $tls;
    }

    public function getDefaultTools(): array
    {
        return [
            Tools\AlignCenter::make(),
            Tools\AlignEnd::make(),
            Tools\AlignJustify::make(),
            Tools\AlignStart::make(),
            Tools\Blockquote::make(),
            Tools\Bold::make(),
            Tools\BulletList::make(),
            Tools\Code::make(),
            Tools\Details::make(),
            Tools\Divider::make(),
            Tools\Grid::make(),
            Tools\HeadingFive::make(),
            Tools\HeadingFour::make(),
            Tools\HeadingOne::make(),
            Tools\HeadingSix::make(),
            Tools\HeadingThree::make(),
            Tools\HeadingTwo::make(),
            Tools\HorizontalRule::make(),
            Tools\Italic::make(),
            Tools\Link::make(),
            Tools\Media::make(),
            Tools\OrderedList::make(),
            Tools\Paragraph::make(),
            Tools\Strike::make(),
            Tools\Subscript::make(),
            Tools\Superscript::make(),
            Tools\Underline::make(),
            Tools\Notice::make(),
            Tools\Highlight::make(),
        ];
    }
}
