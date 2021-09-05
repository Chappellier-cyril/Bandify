import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useAudio = (url) => {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(new Audio(url));
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    }
    else {
      audio.pause();
    }
  }, [playing]);
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const AudioPlayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);
  return (
    <div className="profile__player__container">
      <div>
        <button type="button" onClick={toggle} className="">
          <i className={playing ? 'fal fa-pause-circle' : 'fal fa-play-circle'} />
        </button>
        <button type="button" onClick={toggle} className="">
          <i className={playing ? 'fal fa-pause-circle' : 'fal fa-play-circle'} />
        </button>
      </div>
    </div>

  );
};

AudioPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AudioPlayer;
