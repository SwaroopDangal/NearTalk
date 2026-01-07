import React, { useState } from "react";
import { Users, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import useGeolocation from "../hooks/useGeoLocation";
import useCreateGroup from "../hooks/useCreateGroup";
const Creategroup = () => {
  const [groupName, setgroupName] = useState("");
  const navigate = useNavigate();

  const { location } = useGeolocation();
  console.log(location);
  const { createGroupMutation, isCreatingGroup } = useCreateGroup(
    groupName,
    location
  );

  const handleCreate = () => {
    if (groupName) {
      createGroupMutation();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          className="text-white/90 hover:text-white flex items-center gap-2 mb-4 transition-colors"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to home</span>
        </button>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Create a Group
            </h1>
            <p className="text-gray-600">
              Start a chat group for people nearby
            </p>
          </div>

          {/* group Name Input */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setgroupName(e.target.value)}
                placeholder="Enter a name for your group"
                className="w-full px-5 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                maxLength={50}
              />
              <div className="text-xs text-gray-500 text-right">
                {groupName.length}/50 characters
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={!groupName.trim()}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none transition-all duration-200"
            >
              Create Group
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 space-y-2">
            <p className="text-sm text-gray-700 font-medium">
              💡 Your group will be visible to users within 5km
            </p>
            <p className="text-xs text-gray-600">
              Anyone nearby can join and start chatting anonymously
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creategroup;
