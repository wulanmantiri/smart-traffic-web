import React, { FC, RefObject, VideoHTMLAttributes } from 'react';

const Video: FC<
  VideoHTMLAttributes<HTMLVideoElement> & {
    videoNode: RefObject<HTMLVideoElement>;
  }
> = ({ videoNode, className, ...props }) => (
  <div data-vjs-player>
    <video
      className={`video-js vjs-big-play-centered ${className}`}
      {...props}
      ref={videoNode}
    />
  </div>
);

export default Video;
