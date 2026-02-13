
import React, { useState, useEffect, useRef, useCallback } from 'react';
import HeartBackground from './components/HeartBackground';
import { generateLoveLetter, generateRomanticImage } from './services/geminiService';

const App: React.FC = () => {
  const [recipient, setRecipient] = useState("My Love");
  const [message, setMessage] = useState("Every day with you feels like a page from the most beautiful love story ever written. You are my safe place, my greatest adventure, and the reason my heart beats with so much joy.");
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/seed/valentine/800/800");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ top: 0, left: 0 });
  const [showConfig, setShowConfig] = useState(false);
  const [details, setDetails] = useState("");

  const noBtnRef = useRef<HTMLButtonElement>(null);

  const handleYes = () => {
    setIsAccepted(true);
    // Add confetti effect or sound if desired
    const audio = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3');
    audio.play().catch(() => {});
  };

  const moveNoButton = useCallback(() => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoBtnPos({ top: y, left: x });
  }, []);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const [newLetter, newImage] = await Promise.all([
        generateLoveLetter(details || "classic romance", recipient),
        generateRomanticImage(details || "A cozy fireplace with two glasses of wine and rose petals")
      ]);
      setMessage(newLetter);
      if (newImage) setImageUrl(newImage);
      setShowConfig(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isAccepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-400 to-pink-600 text-white p-6">
        <HeartBackground />
        <div className="bg-white/20 backdrop-blur-xl p-12 rounded-3xl shadow-2xl text-center max-w-2xl transform transition-all animate-[bounce_2s_infinite]">
          <h1 className="text-6xl font-dancing mb-6">Yaaaaay! ❤️</h1>
          <p className="text-2xl font-light mb-8 italic">"I love you forever and always. You've made me the happiest person in the world."</p>
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y2Ynh3NHR3ZWZ4ZWZ4ZWZ4ZWZ4ZWZ4ZWZ4ZWZ4ZWZ4ZWZ4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqfJA/giphy.gif" 
            alt="Happy dance" 
            className="rounded-xl shadow-lg mx-auto w-full max-w-sm mb-8"
          />
          <button 
            onClick={() => setIsAccepted(false)}
            className="px-8 py-3 bg-white text-rose-500 rounded-full font-bold hover:bg-rose-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      <HeartBackground />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-rose-100">
        
        {/* Left Side: Image */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Valentine" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
            <h2 className="text-white text-4xl font-dancing">For {recipient}</h2>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          <span className="text-rose-400 font-semibold uppercase tracking-widest text-sm mb-4">Happy Valentine's Day</span>
          <h1 className="text-4xl md:text-5xl font-playfair text-slate-800 mb-6 leading-tight">Will you be my Valentine?</h1>
          
          <div className="prose prose-rose mb-8">
            <p className="text-slate-600 text-lg leading-relaxed italic">
              "{message}"
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={handleYes}
              className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-rose-200 transition-all transform hover:-translate-y-1"
            >
              Yes, I will! 💖
            </button>
            
            <button 
              ref={noBtnRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{
                position: noBtnPos.top !== 0 ? 'fixed' : 'relative',
                top: noBtnPos.top !== 0 ? noBtnPos.top : 'auto',
                left: noBtnPos.left !== 0 ? noBtnPos.left : 'auto',
                zIndex: 50
              }}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full font-semibold text-lg transition-all"
            >
              No thanks 😅
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-rose-50 flex items-center justify-between">
            <button 
              onClick={() => setShowConfig(!showConfig)}
              className="text-rose-400 hover:text-rose-600 font-medium flex items-center gap-2 transition-colors"
            >
              <i className={`fa-solid ${showConfig ? 'fa-times' : 'fa-magic'}`}></i>
              {showConfig ? 'Close Editor' : 'AI Personalize'}
            </button>
            <div className="flex gap-3">
              <i className="fa-brands fa-instagram text-slate-300 hover:text-rose-400 cursor-pointer transition-colors"></i>
              <i className="fa-brands fa-twitter text-slate-300 hover:text-rose-400 cursor-pointer transition-colors"></i>
            </div>
          </div>
        </div>
      </div>

      {/* AI Config Sidebar/Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={() => setShowConfig(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <h3 className="text-2xl font-playfair text-slate-800 mb-2">Magic Customizer</h3>
            <p className="text-slate-500 text-sm mb-6">Let Gemini AI craft the perfect message and scene for your loved one.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Recipient Name</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Darling, Sarah, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">About Us / Memory</label>
                <textarea 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  placeholder="e.g. We love hiking, our first date was at a sushi bar, she has a beautiful laugh..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-200 focus:outline-none transition-all resize-none"
                />
              </div>
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-rose-100 hover:shadow-rose-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    Brewing Romance...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    Generate AI Valentine
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Info */}
      <div className="fixed bottom-6 left-6 text-slate-400 text-xs font-medium uppercase tracking-widest hidden lg:block">
        Made with ❤️ & AI
      </div>
    </div>
  );
};

export default App;
