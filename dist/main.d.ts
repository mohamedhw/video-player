interface VideoPlayerOptions {
    parentId: string;
    src: string;
    skipAmount?: number;
    width?: string;
    theme?: string;
    btnColor?: string;
    fontSize?: string;
}
declare class VideoPlayer {
    private video;
    private playBtn;
    private forwardBtn;
    private backwardBtn;
    private playback;
    private currentTime;
    private duration;
    private volumeInput;
    private muteBtn;
    private settingsOptions;
    private settingBtn;
    private fullScreen;
    private parentId;
    private src;
    private skipAmount;
    private width;
    private theme;
    private btnColor;
    private fontSize;
    constructor(options: VideoPlayerOptions);
    private initialize;
    private addVideoHtml;
    private showOptians;
    private changeSpeed;
    private togglePlay;
    private skip;
    private toggleMute;
    private updateVolume;
    private formatTime;
    private toggleFullscreen;
    addPlayerStyles(): void;
}
export default VideoPlayer;
