import { useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export const useCameraHandler = (saveToServer: any, setRecords: any) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);
  const [lastScanTime, setLastScanTime] = useState(0);

  // --- flag khóa quét trùng nhanh ---
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

    // ⛔ chống spam event
    if (scanningRef.current) return;
    if (now - lastScanTime < 2000) return;
    if (data.data === lastData) return;

    scanningRef.current = true; // khóa lại
    setLastScanTime(now);
    setLastData(data.data);

    try {
      const ok = await saveToServer(data.data);
      if (!ok) return;

      const current = new Date();
      setRecords((prev: any[]) => [
        {
          id: prev.length + 1,
          date: current.toLocaleDateString("vi-VN"),
          time: current.toLocaleTimeString("vi-VN"),
          method: "QR Camera",
        },
        ...prev,
      ]);

      Alert.alert("✅ Thành công", "Đã chấm công qua Camera!");
      setIsCameraVisible(false);
    } catch (err) {
      console.error("Lỗi quét QR:", err);
    } finally {
      // mở lại sau 3 giây
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
