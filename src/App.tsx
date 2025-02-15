import React, { useState } from 'react';
import { Shield, Loader2, UserCircle2, Zap, Sparkles, Target } from 'lucide-react';
import { generateSuperhero } from './lib/gemini';

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [superhero, setSuperhero] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    setError('');
    try {
      const result = await generateSuperhero(name);
      setSuperhero(result);
    } catch (err) {
      setError('Failed to generate superhero identity. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSuperhero = (text: string) => {
    const sections = text.split('\n').filter(line => line.trim());
    const formattedSections = sections.map(section => {
      if (section.includes('Superhero Name:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'name',
          content: content.join(':').trim()
        };
      }
      if (section.includes('Superpowers:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'powers',
          content: content.join(':').trim()
        };
      }
      if (section.includes('Origin Story:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'origin',
          content: content.join(':').trim()
        };
      }
      if (section.includes('Heroic Mission:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'mission',
          content: content.join(':').trim()
        };
      }
      return {
        type: 'text',
        content: section.trim()
      };
    });
    return formattedSections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            Superhero Generator <Shield className="w-10 h-10 text-yellow-400" />
          </h1>
          <p className="text-blue-200 text-lg">Discover your heroic alter ego...</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="flex-1 px-4 py-2 rounded-lg bg-blue-700/50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !name}
              className="px-6 py-2 bg-yellow-500 text-blue-900 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Transform'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg mb-8">
            {error}
          </div>
        )}

        {superhero && (
          <div className="p-8 bg-blue-800/50 backdrop-blur-sm border border-blue-300 rounded-lg shadow-2xl">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-xl font-bold text-blue-200">
                <UserCircle2 className="w-6 h-6" />
                <span>Civilian Identity:</span>
                <span className="text-white">{name}</span>
              </div>
              
              {formatSuperhero(superhero).map((section, index) => {
                switch (section.type) {
                  case 'name':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Shield className="w-6 h-6 mt-1 text-yellow-400 flex-shrink-0" />
                        <div>
                          <div className="text-yellow-400 font-bold mb-2">Superhero Name:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  case 'powers':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Zap className="w-6 h-6 mt-1 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="text-cyan-400 font-bold mb-2">Superpowers:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  case 'origin':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Sparkles className="w-6 h-6 mt-1 text-purple-400 flex-shrink-0" />
                        <div>
                          <div className="text-purple-400 font-bold mb-2">Origin Story:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  case 'mission':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Target className="w-6 h-6 mt-1 text-green-400 flex-shrink-0" />
                        <div>
                          <div className="text-green-400 font-bold mb-2">Heroic Mission:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div key={index} className="text-lg">
                        {section.content}
                      </div>
                    );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;