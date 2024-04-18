<figure class="p-6 rounded-sm">
@if ($media_id)
    {!! \AdvancedMediaHandler\Services\ImageUrlService::getImageHtml(\AdvancedMediaHandler\Models\Media::find($media_id)->getFirstMedia('images'), null, '1200px', [ 'class' => 'rounded-lg my-4 w-full' ]) !!}
@endif
@if ($caption)
    <figcaption>{{ $caption }}</figcaption>
@endif
</figure>
