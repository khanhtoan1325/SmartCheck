import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import useTimeTracking from "../../hooks/attendance";
import { useCameraHandler } from ".././../hooks/useCameraHandler";

const TimeTracking = () => {
  const {
    records,
    setRecords,
    inputCode,
    setInputCode,
    currentCode,
    handleQRCodeScan,
    handleCodeSubmit,
    regenerateCode,
    saveToServer,
  } = useTimeTracking();
  const {
    isCameraVisible,
    toggleCamera,
    handleCameraScan,
    setIsCameraVisible,
  } = useCameraHandler(saveToServer, setRecords);

  const [userData, setUserData] = useState<{
    user_id: number;
    employee_id: string;
    username: string;
  } | null>(null);

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("userData");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
      } else {
        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
      }
    } catch (e) {
      console.error("Lỗi lấy dữ liệu người dùng:", e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#1976D2", "#42A5F5", "#E3F2FD"]}
        style={styles.background}
      >
        <View style={styles.container}>
          {/* --- HEADER --- */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Xin chào,</Text>
            <Text style={styles.name}>
              {userData?.username || "Người dùng"}
            </Text>
          </View>
          {/* --- MÃ CHẤM CÔNG --- */}
          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Mã chấm công hiện tại</Text>
            <Text style={styles.code}>{currentCode}</Text>
            <TouchableOpacity onPress={regenerateCode}>
              <FeatherIcon
                name="refresh-cw"
                color="#2196F3"
                size={22}
                style={styles.refreshIcon}
              />
            </TouchableOpacity>
          </View>
          {/* --- HÀNH ĐỘNG --- */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.qrButton} onPress={toggleCamera}>
              <FeatherIcon name="camera" color="#fff" size={22} />
              <Text style={styles.qrButtonText}>
                {isCameraVisible ? "Đóng Camera" : "Mở Camera"}
              </Text>
            </TouchableOpacity>

            <View style={styles.codeInputContainer}>
              <FeatherIcon name="type" size={18} color="#2196F3" />
              <TextInput
                style={styles.codeInput}
                placeholder="Nhập mã chấm công..."
                placeholderTextColor="#888"
                value={inputCode}
                onChangeText={setInputCode}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleCodeSubmit}
              >
                <FeatherIcon name="check-circle" color="#fff" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {/* --- CAMERA VIEW --- */}
          {isCameraVisible && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
              }}
            >
              <CameraView
                style={{ flex: 1 }}
                onBarcodeScanned={handleCameraScan}
              />
              {/* Nút đóng camera */}
              <TouchableOpacity
                onPress={() => setIsCameraVisible(false)}
                style={{
                  position: "absolute",
                  top: 40,
                  right: 20,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* --- LỊCH SỬ --- */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lịch sử chấm công</Text>

              {records.length === 0 ? (
                <View style={styles.emptyHistory}>
                  <FeatherIcon name="clock" color="#90a4ae" size={48} />
                  <Text style={styles.emptyText}>Chưa có bản ghi nào</Text>
                </View>
              ) : (
                records.map((record: any, index: number) => (
                  <TouchableOpacity
                    key={record.id ?? `record-${index}`}
                    style={styles.recordItem}
                    activeOpacity={0.8}
                  >
                    <View style={styles.recordIcon}>
                      <FeatherIcon
                        name="check-circle"
                        color="#4CAF50"
                        size={22}
                      />
                    </View>
                    <View style={styles.recordContent}>
                      <Text style={styles.recordDate}>{record.date}</Text>
                      <Text style={styles.recordTime}>{record.time}</Text>
                      <Text style={styles.recordMethod}>
                        Phương thức: {record.method}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // --- Header ---
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    color: "#E3F2FD",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },

  // --- Code box ---
  codeBox: {
    alignItems: "center",
    margin: 20,
    padding: 22,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  codeLabel: {
    fontSize: 16,
    color: "#333",
  },
  code: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2196F3",
    marginTop: 8,
  },
  refreshIcon: {
    marginTop: 10,
  },

  // --- Actions ---
  actionContainer: {
    marginHorizontal: 20,
  },
  qrButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    backgroundColor: "#43A047",
    borderRadius: 12,
    marginBottom: 16,
  },
  qrButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  codeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  codeInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 8,
  },

  // --- History ---
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 20,
    color: "#fff",
  },
  recordItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  recordIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  recordContent: {
    flex: 1,
    marginLeft: 12,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
  },
  recordTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  recordMethod: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  emptyHistory: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});

export default function TimeTrackingTab() {
  return <TimeTracking />;
}
