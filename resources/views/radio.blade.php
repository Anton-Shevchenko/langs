{{--@extend('layouts.app')--}}
{{--@section('content')--}}
    <audio id="player2" preload="none" controls width="750"
           data-cast-title="your-title"
           data-cast-description="your-description"
           data-cast-poster="your-poster">
        <source src="{{route('audio-stream',["1.mp3"])}}"
                type="audio/mp3"
                title="your-title"
                data-playlist-thumbnail="your thumbnail"
                data-playlist-description="your-description">
    </audio>
{{--@endsection--}}
