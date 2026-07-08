const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Audio Player
      </h2>

      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>
    </div>
  );
};

export default AudioPlayer;