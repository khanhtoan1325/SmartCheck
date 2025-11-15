import { useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { API } from "../hooks/api/api";

// Hàm gọi API kiểm tra QR hợp lệ
const validateQrToken = async (qrToken: string) => {
  try {
    const res = await fetch(API.VALIDATE_QR, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: qrToken,
        ttl: 300,
      }),
    });

    const data = await res.json();
    console.log("Kết quả validate:", data);

    if (!data.valid) {
      Alert.alert("❌ QR không hợp lệ", data.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Lỗi API:", err);
    Alert.alert(
      "Lỗi mạng",
      "Không kết nối được server. Kiểm tra lại LAN IP hoặc Backend."
    );
    return null;
  }
};

export const useCameraHandler = (saveToServer: any, setRecords: any) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);
  const [lastScanTime, setLastScanTime] = useState(0);

  const scanningRef = useRef(false);

  useEffect(() => {
    if (permission?.granted) setHasPermission(true);
    else setHasPermission(false);
  }, [permission]);

  const askForCameraPermission = async () => {
    const result = await requestPermission();
    setHasPermission(result.granted);
  };

  const toggleCamera = async () => {
    if (!hasPermission) await askForCameraPermission();
    setIsCameraVisible((prev) => !prev);
  };

  const handleCameraScan = async (data: any) => {
    if (!data?.data) return;

    const now = Date.now();

    if (scanningRef.current) return;
    if (now - lastScanTime < 2000) return;
    if (data.data === lastData) return;

    scanningRef.current = true;
    setLastScanTime(now);
    setLastData(data.data);

    try {
      // -------------------------------------------
      //  KIỂM TRA QR HỢP LỆ
      // -------------------------------------------

      const qrResult = await validateQrToken(data.data);
      if (!qrResult) {
        scanningRef.current = false;
        return;
      }

      // Nếu valid => lấy userId từ token
      const userId = qrResult.userId;

      // optional: lưu vào server của bạn
      const ok = await saveToServer(userId);
      if (!ok) return;

      const current = new Date();
      setRecords((prev: any[]) => [
        {
          id: prev.length + 1,
          userId: userId,
          date: current.toLocaleDateString("vi-VN"),
          time: current.toLocaleTimeString("vi-VN"),
          method: "QR Camera",
        },
        ...prev,
      ]);

      Alert.alert("✅ Thành công", `Check-in cho nhân viên: ${userId}`);
      setIsCameraVisible(false);
    } catch (err) {
      console.error("Lỗi quét QR:", err);
    } finally {
      setTimeout(() => {
        scanningRef.current = false;
      }, 3000);
    }
  };

  return {
    isCameraVisible,
    toggleCamera,
    handleCameraScan,
    setIsCameraVisible,
  };
};
