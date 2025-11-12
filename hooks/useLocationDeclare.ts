import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import MapView, { MapPressEvent } from "react-native-maps";
import { API_BASE_URL } from "../routes/config";

export const useLocationDeclare = () => {
  const [region, setRegion] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef<MapView>(null);

  // 🔹 Lấy vị trí hiện tại khi vào màn hình
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 🧭 Hàm lấy vị trí hiện tại của người dùng
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Quyền bị từ chối", "Không thể truy cập vị trí của bạn.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const regionData = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(regionData);
      setMarker({ latitude, longitude });
      await getAddressFromCoords(latitude, longitude);
    } catch (err) {
      console.error("❌ Lỗi khi lấy vị trí hiện tại:", err);
      Alert.alert("Lỗi", "Không thể lấy vị trí hiện tại.");
    }
  };

  // 🏠 Hàm lấy địa chỉ từ tọa độ
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (result[0]) {
        const addr = `${result[0].name || ""}, ${result[0].street || ""}, ${
          result[0].city || ""
        }`;
        setAddress(addr);
      }
    } catch (err) {
      console.error("⚠️ Lỗi khi lấy địa chỉ:", err);
    }
  };

  // 📍 Khi người dùng nhập địa chỉ
  const getCoordsFromAddress = async (addr: string) => {
    try {
      const result = await Location.geocodeAsync(addr);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        setMarker({ latitude, longitude });
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert("Không tìm thấy địa chỉ", "Hãy nhập địa chỉ khác.");
      }
    } catch (err) {
      console.error("⚠️ Lỗi khi lấy tọa độ từ địa chỉ:", err);
    }
  };

  // 🎯 Khi bấm vào bản đồ
  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    getAddressFromCoords(latitude, longitude);
  };

  // 💾 Gửi vị trí lên backend Node.js
  const saveLocationToServer = async (
    latitude: number,
    longitude: number,
    description: string
  ) => {
    try {
      console.log("📤 Gửi dữ liệu:", { latitude, longitude, description });

      const response = await fetch(`${API_BASE_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
          description,
        }),
      });

      const data = await response.json();
      console.log("📩 Phản hồi từ server:", data);

      if (response.ok) {
        Alert.alert("✅ Thành công", "Đã lưu vị trí!");
      } else {
        Alert.alert("❌ Lỗi", data.error || "Không thể lưu vị trí");
      }
    } catch (err) {
      console.error("⚠️ Lỗi gửi API:", err);
      Alert.alert("Lỗi", "Không thể kết nối đến server. Kiểm tra lại IP.");
    }
  };

  // ✅ Khi người dùng xác nhận lưu vị trí
  const handleConfirm = () => {
    if (!marker) {
      Alert.alert("⚠️ Chưa chọn vị trí", "Hãy chọn vị trí trước khi lưu.");
      return;
    }

    Alert.alert("Xác nhận", `Địa chỉ của bạn là:\n${address}`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Lưu",
        onPress: () =>
          saveLocationToServer(
            marker.latitude,
            marker.longitude,
            address || "Không có mô tả"
          ),
      },
    ]);
  };

  return {
    region,
    marker,
    address,
    mapRef,
    setAddress,
    getCoordsFromAddress,
    getCurrentLocation,
    handleMapPress,
    handleConfirm,
  };
};
