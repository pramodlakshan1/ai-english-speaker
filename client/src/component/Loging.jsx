import React, { useState } from 'react';
import { MessageSquare, User, Briefcase, Calendar } from 'lucide-react'; // Optional icons for better UX
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Loging() {
 
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.age) tempErrors.age = "Age is required.";
    if (formData.age < 0 || formData.age > 120) tempErrors.age = "Please enter a valid age.";
    if (!formData.occupation) tempErrors.occupation = "Occupation is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
   e.preventDefault();
   if (validate()){ // Usually you want this for form submissions
    navigate("/avatar", {state:{user:formData}});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-center">
          <div className="mx-auto bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <MessageSquare className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Speak with YOU</h2>
          <p className="text-indigo-100 text-sm">
            Tell us a little about yourself so we can personalize your English practice.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-500'
              } outline-none transition duration-200 bg-gray-50 focus:bg-white`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Age Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.age ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-500'
              } outline-none transition duration-200 bg-gray-50 focus:bg-white`}
            />
            {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
          </div>

          {/* Occupation Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.occupation ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-500'
              } outline-none transition duration-200 bg-gray-50 focus:bg-white`}
            />
            {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 duration-200"
          >
            Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
};

export default Loging