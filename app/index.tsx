import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 🔐 Lấy token hoặc thông tin đăng nhập từ AsyncStorage
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          // Đã đăng nhập → vào tab chính
          router.replace("/loginScreen");
        } else {
          // Chưa đăng nhập → về login
          router.replace("/loginScreen");
        }
      } catch (error) {
        console.error("Error checking login:", error);
        router.replace("/loginScreen");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
