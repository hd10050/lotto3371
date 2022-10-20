import AudioPlayer from 'react-h5-audio-player';

function Player() {
    return (
        <div className="player">
            <AudioPlayer
                autoPlay={false}
                src={process.env.PUBLIC_URL + "/bgm/Go.mp3"}
                volume={0.2}
                onPlay={e => console.log("onPlay")}
            />
        </div>
    )
}

export default Player;