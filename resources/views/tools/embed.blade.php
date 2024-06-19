<div class="oembed">
    @php
    $embera = new \Embera\Embera([
        'instagram_access_token' => 'EAABtyWWnvjQBOy6tDSw5It0HDjeDW67aaYWMxraAD0wZBGrrD0lsCh2JeZCvK2ZBYse3EvemdXzB6jwe1ZBiBqiqDh8gXzzY0lc10IGjqrph5wrD11RBhWEIvmKmQv6WFHZARGtG9xb1O2bH7ih6RuyReqFjRZBuGyZCZAdG9ZCth9FZC6T8LYk1IS6JD4xdlEvwZA3WbqBEZAJ5iMPq6jGUwqS1nQURjuvjIKt8dcL1x91RO6m6MMFCA3K0uwNYGVd8JhIn39EeNjfW'
    ]);
    $embed = $embera->autoEmbed($url);
    @endphp
    {!!  $embed !!}
</div>
