import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { API_BASE_URL } from "../routes/config"; // import URL từ file config

type Record = {
  id: number;
  date: string;
  time: string;
  method: string;
};

const generateRandomCode = (length = 6): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const useTimeTracking = () => {
  const navigation = useNavigation<any>();
  const [records, setRecords] = useState<Record[]>([]);
  const [inputCode, setInputCode] = useState("");
  const [currentCode, setCurrentCode] = useState(generateRandomCode());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [userData, setUserData] = useState<{
    id: number;
    employee_id: string;
  } | null>(null);

  // Lấy vị trí hiện tại
  const getCurrentLocation = async (): Promise<string | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Lỗi", "Không được cấp quyền truy cập vị trí.");
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = `${location.coords.latitude},${location.coords.longitude}`;
      return coords;
    } catch (error) {
      console.error("Lỗi lấy vị trí:", error);
      return null;
    }
  };

  // Lấy thông tin người dùng từ AsyncStorage
  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("userData");
      if (user) setUserData(JSON.parse(user));
      else Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserData();
    const interval = setInterval(() => {
      setCurrentCode(generateRandomCode());
    }, 300000); // cập nhật mã mỗi 5 phút
    return () => clearInterval(interval);
  }, []);

  // Gửi dữ liệu chấm công check-in
  const saveToServer = async (method: "QR Code" | "Code") => {
    try {
      if (!userData?.employee_id) {
        Alert.alert("Lỗi", "Thông tin người dùng không có sẵn.");
        return false;
      }

      const location = await getCurrentLocation();
      if (!location) return false;

      const res = await fetch(`${API_BASE_URL}/api/attendances/checking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: userData.employee_id,
          check_in_location: location,
          random_code: currentCode,
        }),
      });

      if (!res.ok) throw new Error("Gửi dữ liệu thất bại");
      return true;
    } catch (err) {
      console.error("Lỗi API check-in:", err);
      Alert.alert("Lỗi", "Không thể gửi dữ liệu đến server.");
      return false;
    }
  };

  // Gửi dữ liệu check-out
  const saveCheckoutToServer = async () => {
    try {
      if (!userData?.employee_id) {
        Alert.alert("Lỗi", "Thông tin người dùng không có sẵn.");
        return false;
      }

      const location = await getCurrentLocation();
      if (!location) return false;

      const res = await fetch(`${API_BASE_URL}/api/attendances/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: userData.employee_id,
          check_out_location: location,
        }),
      });

      if (!res.ok) throw new Error("Gửi dữ liệu thất bại");
      return true;
    } catch (err) {
      console.error("Lỗi API checkout:", err);
      Alert.alert("Lỗi", "Không thể gửi dữ liệu check-out đến server.");
      return false;
    }
  };

  // Quét QR
  const handleQRCodeScan = async () => {
    const ok = await saveToServer("QR Code");
    if (!ok) return;

    const now = new Date();
    setRecords((prevRecords) => [
      {
        id: prevRecords.length + 1,
        date: now.toLocaleDateString("vi-VN"),
        time: now.toLocaleTimeString("vi-VN"),
        method: "QR Code",
      },
      ...prevRecords,
    ]);

    Alert.alert("Thành công", "Đã chấm công bằng QR.");
  };

  // Submit mã chấm công
  const handleCodeSubmit = async () => {
    if (inputCode.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập mã.");
      return;
    }

    if (inputCode !== currentCode) {
      Alert.alert("Sai mã", "Mã không đúng.");
      return;
    }

    const now = new Date();

    if (!isCheckedIn) {
      const ok = await saveToServer("Code");
      if (!ok) return;
      setRecords((prevRecords) => [
        {
          id: prevRecords.length + 1,
          date: now.toLocaleDateString("vi-VN"),
          time: now.toLocaleTimeString("vi-VN"),
          method: "Check-in",
        },
        ...prevRecords,
      ]);
      setIsCheckedIn(true);
      Alert.alert("Thành công", "Đã check-in thành công.");
    } else {
      const ok = await saveCheckoutToServer();
      if (!ok) return;
      setRecords((prevRecords) => [
        {
          id: prevRecords.length + 1,
          date: now.toLocaleDateString("vi-VN"),
          time: now.toLocaleTimeString("vi-VN"),
          method: "Check-out",
        },
        ...prevRecords,
      ]);
      setIsCheckedIn(false);
      Alert.alert("Thành công", "Đã check-out thành công.");
    }

    setInputCode("");
    regenerateCode();
  };

  // Bấm nút check-out (nếu có)
  const handleCheckout = async () => {
    const ok = await saveCheckoutToServer();
    if (!ok) return;

    const now = new Date();
    setRecords((prevRecords) => [
      {
        id: prevRecords.length + 1,
        date: now.toLocaleDateString("vi-VN"),
        time: now.toLocaleTimeString("vi-VN"),
        method: "Checkout",
      },
      ...prevRecords,
    ]);
    Alert.alert("Thành công", "Đã check-out thành công.");
  };

  // Đổi mã thủ công
  const regenerateCode = () => {
    setCurrentCode(generateRandomCode());
  };

  return {
    records,
    inputCode,
    setInputCode,
    currentCode,
    handleQRCodeScan,
    handleCodeSubmit,
    regenerateCode,
    saveCheckoutToServer,
    handleCheckout,
    saveToServer, //
    setRecords, //
  };
};

export default useTimeTracking;
