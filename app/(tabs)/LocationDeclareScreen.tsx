import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocationDeclare } from "../../hooks/useLocationDeclare";

const LocationDeclareScreen = () => {
  const {
    region,
    marker,
    address,
    setAddress,
    mapRef,
    getCoordsFromAddress,
    getCurrentLocation,
    handleMapPress,
    handleConfirm,
  } = useLocationDeclare();

  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text>Đang xác định vị trí...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ hoặc chọn trên bản đồ..."
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={() => getCoordsFromAddress(address)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.currentButton}
          onPress={getCurrentLocation}
        >
          <Text style={styles.buttonText}>📍 Dùng vị trí hiện tại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>✅ Xác nhận vị trí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationDeclareScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  map: { flex: 1 },
  inputContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 5,
  },
  input: { height: 45, fontSize: 16 },
  buttonContainer: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
  },
  currentButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
