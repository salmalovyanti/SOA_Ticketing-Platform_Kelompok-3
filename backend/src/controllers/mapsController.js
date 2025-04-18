const axios = require('axios');

exports.getPlaceInfo = async (req, res) => {
  try {
    const { place } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: place,
          key: apiKey,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch place info' });
  }
};
