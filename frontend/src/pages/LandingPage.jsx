import React, { useEffect, useState } from "react";
import { MapPin, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import useUsername from "../hooks/useUsername";
import useGeolocation from "../hooks/useGeoLocation";

const LandingPage = () => {
  const navigate = useNavigate();

  const { username, regenerate } = useUsername();

  const { location } = useGeolocation();
  if (!username) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl">
                <MapPin className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NearTalk
            </h1>

            <p className="text-xl text-gray-600 font-medium">
              Anonymous chat within 5km
            </p>
          </div>

          {/* Username Display */}
          <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">
                Your anonymous identity
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-2xl font-bold text-gray-800">{username}</div>

              <button
                onClick={regenerate}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-all"
              >
                Regenerate
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
              onClick={() => navigate("/nearbyGroups")}
            >
              <MapPin className="w-5 h-5" />
              Find groups near me
            </button>

            <button
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
              onClick={() => navigate("/createGroup")}
            >
              <Users className="w-5 h-5" />
              Create a group
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center space-y-2">
              <div className="text-2xl">🎭</div>
              <p className="text-xs text-gray-600 font-medium">Anonymous</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">📍</div>
              <p className="text-xs text-gray-600 font-medium">Nearby Only</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">⚡</div>
              <p className="text-xs text-gray-600 font-medium">Instant Chat</p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white/80 text-sm mt-6">
          Connect with people around you anonymously
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
