import { useState, useEffect } from "react";
import { supabase } from "../assets/supabase-client";

function PrivacyAndData({ user }) {
  const [adsPersonalized, setAdsPersonalized] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase
      .from("profiles")
      .select("ads_personalized")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setAdsPersonalized(data.ads_personalized);
      });
  }, [user.id]);

  const handleToggle = async () => {
    const newValue = !adsPersonalized;
    setAdsPersonalized(newValue); // update UI instantly

    const { error } = await supabase
      .from("profiles")
      .update({ ads_personalized: newValue })
      .eq("user_id", user.id);

    if (error) {
      setMessage(error.message);
      setAdsPersonalized(!newValue); // revert if it failed to save
    }
  };

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={adsPersonalized}
          onChange={handleToggle}
        />
        Show me personalized ads based on my activity
      </label>
      <p>{message}</p>
    </div>
  );
}

export default PrivacyAndData;
