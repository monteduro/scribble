<div class="p-8">
    @php
    $embera = new \Embera\Embera();
    $embed = $embera->getUrlData($url);
    @endphp
    {!! $embed[$url]["html"] !!}
</div>
