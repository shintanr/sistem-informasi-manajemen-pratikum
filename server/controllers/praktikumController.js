import { getModulesEldasByPraktikumId } from "../config/database.js";

export const getModulesByPraktikumId = async (req, res) => {
  try {
    const { prakId } = req.params;
    const module = await getModulesEldasByPraktikumId(prakId);

    res.json({
      message: `List of Module Praktikum Elektronika Dasar ${prakId}`,
      data: module,
    });
  } catch (error) {
    console.error("Error fetching module:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};