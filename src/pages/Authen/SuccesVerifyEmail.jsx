import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmRegisterApi } from "../../services/Authen/ConfirmRegister";

export default function Success() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Đang xác nhận...");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const payload = {
      accessToken: params.get("access_token"),
     refreshToken: params.get("refresh_token"),
      tokenType: params.get("token_type"),
     type: params.get("type"),
      expiresAt: params.get("expires_at"),
      expiresIn: params.get("expires_in"),
    };
    console.log("Payload:", payload);

    const handleConfirm = async () => {
      try {
        const result = await confirmRegisterApi(payload);
        console.log("Confirm success:", result);

        setStatus("✅ Xác nhận thành công! Bạn sẽ được chuyển về login...");
        setTimeout(() => navigate("/login"), 5000);
      } catch (err) {
       
      }
    };

    if (payload.accessToken && payload.refreshToken) {
      handleConfirm();
    } else {
      setStatus("❌ Thiếu thông tin token!");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
}
