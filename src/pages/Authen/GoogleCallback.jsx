import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGoogleSession } from "../../services/Authen/createGoogleSession";


export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    createGoogleSession(accessToken, refreshToken)
      .then(() => navigate("/"))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700 text-lg">Logging in with Google...</p>
    </div>
  );
}
