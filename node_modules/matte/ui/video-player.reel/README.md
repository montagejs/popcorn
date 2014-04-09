# Video Player

Status: __In progress__

The Video Player component wraps a video element and provides custom controls.

## How to use

```html
<div data-montage-id="videoPlayer"></div>
```

```json
"videoPlayer": {
    "prototype": "ui/video-player.reel",
    "properties": {
        "element": {
            "#": "videoPlayer"
        },
        "src": "movie.mp4",
        "posterSrc": "poster.png",
        "autoHide": "true"
    }
}
```


## Available properties

* `src` - Source file of the video.
* `posterSrc` - An image that gets shown before the video plays.
* `sources` - Array of video source files.
* `supportsFullScreen` - Determines whether fullscreen mode is supported.
* `autoHide` - Determines whether video controls are hidden automatically.
* `videoController` - The MediaController object used to control playback.


## Using multiple sources

Multiple source files in different formats can be specified with the `sources` property. The Video Player component will use the first source with a supported media type.

```json
"videoPlayer": {
    "prototype": "ui/video-player.reel",
    "properties": {
        "element": {"#": "videoPlayer"},
        "sources": [
            {"src": "movie.ogg", "type": "video/ogg"},
            {"src": "movie.mp4", "type": "video/mpeg"}
        ]
    }
}
```

## Synchronized playback

Playback of multiple videos can be synchronized by using the same MediaController.

```html
<div data-montage-id="videoPlayer1"></div>
<div data-montage-id="videoPlayer2"></div>
```

```json
"videoPlayer1": {
    "prototype": "ui/video-player.reel",
    "properties": {
        "element": {"#": "videoPlayer1"},
        "videoController" : {"@": "mediaController"},
        "src": "movie1.mp4"
    }
},
"videoPlayer2": {
    "prototype": "ui/video-player.reel",
    "properties": {
        "element": {"#": "videoPlayer2"},
        "videoController" : {"@": "mediaController"},
        "src": "movie2.mp4"
    }
},
"mediaController": {
    "prototype": "montage/core/media-controller",
    "properties": {
        "autoplay": false
    }
}
```


## Customizing with CSS

* `.matte-VideoPlayer-video` - The Video Player component
* `.matte-VideoPlayer-video` - The actual video element


```css
..matte-VideoPlayer-video {
    border: 2px solid pink;
}
```


## Browser support

* TBD
