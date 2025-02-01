# Custom Video Player

A lightweight, customizable HTML5 video player with modern controls and features. This player provides a clean, intuitive interface with support for various playback controls and customization options.

## Features

- Play/Pause functionality
- Forward/Backward skip controls
- Volume control with mute toggle
- Fullscreen support
- Playback speed control (1x, 2x, 3x)
- Custom video progress bar
- Hover-to-show controls
- Customizable theme and button colors
- Responsive design
- Bootstrap icons integration

## Installation

You can install the package via npm:

```bash
npm install custom-video-player
```

## Usage

### Basic Implementation

```javascript
import VideoPlayer from 'custom-video-player';

const player = new VideoPlayer({
  parentId: 'video-container',
  src: 'path/to/your/video.mp4'
});
```

### HTML Setup

```html
<div id="video-container"></div>
```

### Advanced Configuration

```javascript
const player = new VideoPlayer({
  parentId: 'video-container',
  src: 'path/to/your/video.mp4',
  skipAmount: 15, // Skip amount in seconds (default: 10)
  width: '1000px', // Player width (default: '800px')
  theme: 'rgba(0, 0, 0, 0.8)', // Controls background color
  btnColor: '#ffffff', // Button color
  fontSize: '24px' // Controls font size
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| parentId | string | required | ID of the container element |
| src | string | required | Video source URL |
| skipAmount | number | 10 | Number of seconds to skip when using forward/backward buttons |
| width | string | '800px' | Width of the video player |
| theme | string | 'rgba(0, 0, 0, 0.7)' | Background color of the controls |
| btnColor | string | '#ccc' | Color of the control buttons |
| fontSize | string | '20px' | Font size of the controls |

## Features Details

### Playback Controls
- Play/Pause toggle with button and video click
- Forward/Backward skip with customizable skip duration
- Double-click for fullscreen toggle

### Volume Controls
- Adjustable volume slider
- Mute/Unmute toggle
- Hover-to-show volume slider

### Playback Speed
- Multiple playback speed options (1x, 2x, 3x)
- Easy-to-use speed selection menu

### Progress Control
- Clickable progress bar for quick navigation
- Real-time progress update
- Time display (current/total duration)

## Browser Support

The video player is compatible with all modern browsers that support HTML5 video and ES6 JavaScript.

## Dependencies

- Bootstrap Icons (automatically loaded from CDN)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Bootstrap Icons for the control buttons
- Special thanks to all contributors

