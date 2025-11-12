// app/hooks/useUserData.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const [userData, setUserData] = useState<{
    employee_id: string;
    username: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const json = await AsyncStorage.getItem("userData");
        if (json) {
          const data = JSON.parse(json);
          setUserData({
            employee_id: data.employee_id,
            username: data.username,
            role: data.role,
          });
        }
      } catch (err) {
        console.error("Lỗi đọc AsyncStorage:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return { userData, loading };
};
