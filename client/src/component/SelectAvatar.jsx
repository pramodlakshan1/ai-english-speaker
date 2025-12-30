import React, { useState, useEffect } from 'react';
import { Camera, User, CheckCircle, ChevronRight, Mic } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnglishTutorChat from './TutorChat';

const AvatarSelection = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null); 
  const [cameraAccess, setCameraAccess] = useState(false);
  const location = useLocation();
  const userData = location.state?.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedOption === 'mirror') {
      setCameraAccess(true);
    } else {
      setCameraAccess(false);
    }
  }, [selectedOption]);

  const handleContinue = () => {
    if (selectedOption === 'mirror') {
      alert("This service is not available yet! Pleace use Avatar Option.")
    }else if (selectedOption === 'avatar'){
      navigate('/tutor',{state:{user:userData}});
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Choose Your Conversation Partner</h2>
          <p className="text-gray-600 text-lg">
            Who would you like to practice English with today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Option 1: The Mirror (User's Camera) */}
          <button 
            onClick={() => setSelectedOption('mirror')}
            className={`relative group cursor-pointer text-left bg-white rounded-2xl p-6 transition-all duration-300 border-2 ${
              selectedOption === 'mirror' 
                ? 'border-indigo-600 shadow-xl scale-[1.02]' 
                : 'border-transparent shadow-md hover:shadow-lg hover:border-indigo-200'
            }`}
          >
            <div className="absolute top-4 right-4">
              {selectedOption === 'mirror' && <CheckCircle className="text-indigo-600 w-6 h-6" />}
            </div>

            {/* Visual Representation Area */}
            <div className="h-48 bg-gray-900 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
               {selectedOption === 'mirror' && cameraAccess ? (
                 <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-400 animate-pulse">
                    {/* Placeholder for actual Webcam Feed */}
                    <Camera className="w-12 h-12 mb-2" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Camera Active</span>
                 </div>
               ) : (
                 <div className="flex flex-col items-center text-gray-500 group-hover:text-gray-300 transition-colors">
                   <Camera className="w-12 h-12 mb-2" />
                   <span className="text-sm">Tap to enable camera</span>
                 </div>
               )}
               
               {/* Overlay Badge */}
               <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-2">
                 <Mic className="w-3 h-3" />
                 <span>You</span>
               </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">Speak to the Mirror</h3>
            <p className="text-gray-500 text-sm">
              Practice by looking at yourself. Great for building confidence and checking your own pronunciation and expressions.
            </p>
          </button>

          {/* Option 2: The Avatar */}
          <button 
            onClick={() => setSelectedOption('avatar')}
            className={`relative group cursor-pointer text-left bg-white rounded-2xl p-6 transition-all duration-300 border-2 ${
              selectedOption === 'avatar' 
                ? 'border-indigo-600 shadow-xl scale-[1.02]' 
                : 'border-transparent shadow-md hover:shadow-lg hover:border-indigo-200'
            }`}
          >
            <div className="absolute top-4 right-4">
              {selectedOption === 'avatar' && <CheckCircle className="text-indigo-600 w-6 h-6" />}
            </div>

            {/* Visual Representation Area */}
            <div className="h-48 bg-indigo-50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
               {/* Simple Avatar Illustration */}
               <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 z-10">
                 <User className="w-12 h-12" />
               </div>
               
               {/* Decorative background blurs for flair */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full blur-2xl -mr-10 -mt-10 opacity-60"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200 rounded-full blur-xl -ml-5 -mb-5 opacity-60"></div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">Speak with AI Avatar</h3>
            <p className="text-gray-500 text-sm">
              Chat with a friendly virtual tutor. Choose this if you prefer a face-to-face simulation with a native English speaker.
            </p>
          </button>

        </div>

        {/* Navigation Button */}
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              selectedOption 
                ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 transform hover:-translate-y-1' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Conversation
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AvatarSelection;