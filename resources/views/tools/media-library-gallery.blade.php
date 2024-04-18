<div class="sm-block">
    @once
        @vite(['resources/js/glightbox.js'])
    @endonce

    <!--
    <a href="default.jpg" class="glightbox6" data-title="Responsive example"
    data-description="Your browser will choose the optimal image for the resolution"
    data-sizes="(max-width: 600px) 480px, 800px"
    data-srcset="img480.jpg 480w, img800.jpg 800w">
    <img src="small.jpg" alt="image" />
    </a>
    -->

    @php
    $gallery_count = count($media_ids);
    $lg_elements = min($gallery_count, 3);
    @endphp
    <div class="overflow-x-auto relative flex w-screen gap-3 justify-around left-1/2 ml-[-50vw] px-3 srbar-hide">
        @foreach ($media_ids as $media_id)
            <a href="{{ \AdvancedMediaHandler\Services\ImageUrlService::getImage(\AdvancedMediaHandler\Models\Media::find($media_id)->getFirstMedia('images')) }}" data-type="image" target="_blank" class="glightbox3 flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/{{ $lg_elements }}" data-gallery="gallery1">
                {!! \AdvancedMediaHandler\Services\ImageUrlService::getImageHtml(\AdvancedMediaHandler\Models\Media::find($media_id)->getFirstMedia('images'), null, '1200px', [ 'class' => 'w-full rounded-md' ]) !!}
            </a>
        @endforeach
    </div>

</div>
