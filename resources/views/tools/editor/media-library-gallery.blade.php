<div class="p-6 rounded-sm overflow-x-auto flex items-center gap-3">
@foreach ($media_ids as $media_id)
{!! \AdvancedMediaHandler\Services\ImageUrlService::getImageHtml(\AdvancedMediaHandler\Models\Media::find($media_id)->getFirstMedia('images'), null, '1200px', [ 'class' => 'rounded-lg flex-shrink-0 not-prose max-h-48' ]) !!}
@endforeach
</div>
