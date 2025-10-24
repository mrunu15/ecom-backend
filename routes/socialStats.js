import express from "express";
import fetch from "node-fetch";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("🔍 Fetching social stats...");

    // ========== INSTAGRAM ==========
    const instaRes = await fetch("https://instagram-profile1.p.rapidapi.com/getprofile/mxryu.1010", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",  // <-- replace with your valid key
        "X-RapidAPI-Host": "instagram-profile1.p.rapidapi.com",
      },
    });
    const instaData = await instaRes.json();

    const instagramStats = {
      followers: instaData.followers || instaData.edge_followed_by?.count || 0,
      following: instaData.following || instaData.edge_follow?.count || 0,
    };

    // ========== YOUTUBE ==========
    const ytRes = await fetch(
      "https://youtube-data-api-v3.p.rapidapi.com/channel?id=EJU13AmA9oe8JyVjUqvlKw",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
          "X-RapidAPI-Host": "youtube-data-api-v3.p.rapidapi.com",
        },
      }
    );
    const ytData = await ytRes.json();

    const youtubeStats = {
      subscribers:
        ytData.items?.[0]?.statistics?.subscriberCount
          ? Number(ytData.items[0].statistics.subscriberCount)
          : 0,
      videos:
        ytData.items?.[0]?.statistics?.videoCount
          ? Number(ytData.items[0].statistics.videoCount)
          : 0,
    };

    // ========== LINKEDIN ==========
    const linkedinRes = await fetch(
      "https://linkedin-api8.p.rapidapi.com/similar-profiles?url=https://www.linkedin.com/in/mrunal-patil-1b40a532b/",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
          "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com",
        },
      }
    );
    const linkedinData = await linkedinRes.json();

    const linkedinStats = {
      connections: linkedinData.connections || linkedinData.totalConnections || 0,
    };

    res.json({
      instagram: instagramStats,
      youtube: youtubeStats,
      linkedin: linkedinStats,
    });
  } catch (err) {
    console.error("❌ Error fetching social stats:", err);
    res.status(500).json({ message: "Failed to fetch social data" });
  }
});

export default router;
