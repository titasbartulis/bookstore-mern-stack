import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      const state = queryParams.get('state');

      if (state !== localStorage.getItem("oauth_state")) {
        toast.error("State validation failed. Potential CSRF attack detected.");
        navigate("/");
        return;
      }

      localStorage.removeItem("oauth_state");

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/oauth-token`, { code });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("token_expiry", Date.now() + response.data.expires_in * 1000);
        navigate("/home");
      } catch (error) {
        toast.error("Failed to exchange code for token.");
        navigate("/login");
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div>Loading...</div> 
  );
};

export default OAuthRedirectHandler;
