import express from 'express';
import axios from 'axios';
import querystring from 'querystring';

const router = express.Router();

// Endpoint to exchange authorization code for tokens
router.post('/oauth-token', async (req, res) => {
  const { code } = req.body;
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    client_id: process.env.GCP_CLIENT_ID,
    client_secret: process.env.GCP_CLIENT_SECRET,
    redirect_uri: 'http://localhost:5555/integrations/gcp-secret-manager/oauth2/callback',
  });

  try {
    // Exchange the code for a token
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Send the tokens back to the client
    res.json({
      access_token,
      refresh_token,
      expires_in,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error exchanging code for tokens', error: error.response.data });
  }
});

// Endpoint to refresh the access token
router.post('/refresh-token', async (req, res) => {
  const { refresh_token } = req.body;
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
    client_id: process.env.GCP_CLIENT_ID,
    client_secret: process.env.GCP_CLIENT_SECRET,
  });

  try {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, expires_in } = response.data;

    res.json({
      access_token,
      expires_in,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error refreshing access token', error: error.response.data });
  }
});

export default router;
