import Group from "../models/group.models.js";

export const createGroup = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: "Name and location required" });
    }

    const group = await Group.create({
      name,
      location: {
        type: "Point",
        coordinates: [Number(location.lat), Number(location.lng)],
      },
    });
    if (!group) return res.status(400).json({ message: "Group not created" });
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getNearbyGroups = async (req, res) => {
  try {
    const { lng, lat } = req.query;
    const groups = await Group.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lng],
          },
          $maxDistance: 5000,
        },
      },
    });
    if (groups.length === 0)
      return res.status(404).json({ message: "No groups found" });
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
