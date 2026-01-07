import React from "react";
import { MapPin, Users, ArrowLeft, Radio } from "lucide-react";
import useGetNearByGroups from "../hooks/useGetNearByGroups";
import useGeolocation from "../hooks/useGeoLocation";
import { useNavigate } from "react-router";
import LoaderComponent from "../../components/Loader";

const NearByGroups = () => {
  const { location } = useGeolocation();
  const navigate = useNavigate();
  const { nearbyGroupsData, isNearbyGroupsLoading } = useGetNearByGroups(
    location?.lng,
    location?.lat
  );

  let groupData = [];
  if (nearbyGroupsData) {
    groupData = nearbyGroupsData.map((group) => {
      return {
        id: group._id,
        name: group.name,
        members: group.activeUsers,
        distance: Math.round(
          getDistanceKm(
            Number(location.lat),
            Number(location.lng),
            Number(group.location.coordinates[0]),
            Number(group.location.coordinates[1])
          )
        ),
      };
    });
  }
  console.log(groupData);

  function getDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth radius in km

    const toRad = (deg) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
  }

  const handleJoinGroup = (groupId, groupName) => {
    console.log(`Joining group: ${groupName} (ID: ${groupId})`);
    // Handle join logic here
  };
  if (isNearbyGroupsLoading) return <LoaderComponent fullScreen={false} />;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          className="text-white/90 hover:text-white flex items-center gap-2 mb-4 transition-colors"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to home</span>
        </button>

        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Nearby Groups
              </h1>
            </div>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{groupData.length} groups within 5km</span>
          </p>
        </div>

        {/* Groups List */}
        <div className="space-y-4">
          {groupData.map((group) => (
            <div
              key={group.id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-5 md:p-6"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-800">
                      {group.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members}{" "}
                      {group.members === 1 ? "member" : "members"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {group.distance} km away
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinGroup(group.id, group.name)}
                  className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Group Prompt */}
        <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center">
          <p className="text-gray-600 mb-4">Don't see a group you like?</p>
          <button
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => navigate("/createGroup")}
          >
            Create Your Own Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearByGroups;
