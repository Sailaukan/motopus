import { useState } from 'react';
import { generateAudioNeets } from '../api/neets/tts';

const NeetsGenerator = () => {
    const [voiceId, setVoiceId] = useState<string>('');
    const [script, setScript] = useState<string>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateAudio = async () => {
        generateAudioNeets(voiceId, script);
    };

    return (
        <div>
            <h1>Generate Audio</h1>
            <div>
                <label>
                    Voice ID:
                    <input type="text" value={voiceId} onChange={(e) => setVoiceId(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Script:
                    <textarea value={script} onChange={(e) => setScript(e.target.value)} />
                </label>
            </div>
            <button onClick={handleGenerateAudio} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Audio'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NeetsGenerator;
