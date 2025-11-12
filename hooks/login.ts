// loginLogic.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { API_BASE_URL } from "../routes/config"; // <-- Đường dẫn phù hợp tới config.ts

export function useLoginLogic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu"
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const user = await response.json();

      if (!response.ok) {
        throw new Error(user.message || "Đăng nhập thất bại");
      }

      await AsyncStorage.setItem("userData", JSON.stringify(user));
      router.replace("/(tabs)/attendanceScreen");
    } catch (error) {
      const err = error as Error;
      Alert.alert("Đăng nhập thất bại", err.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    isLoading,
    showPassword,
    setUsername,
    setPassword,
    setShowPassword,
    handleLogin,
  };
}
