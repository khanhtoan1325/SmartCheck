// app/(tabs)/Profile.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useUserData } from "../../hooks/profile";

export default function Profile() {
  const { userData, loading } = useUserData();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      router.replace("/loginScreen");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const menuItems = [
    { icon: "user", text: "Chỉnh sửa hồ sơ" },
    { icon: "settings", text: "Cài đặt" },
    { icon: "help-circle", text: "Trợ giúp & Hỗ trợ" },
  ];

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Đang tải dữ liệu...
        </Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Không thể tải dữ liệu người dùng.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#E8F0FE", "#FFFFFF"]} style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* --- Header --- */}
          <View style={styles.profileHeader}>
            <LinearGradient
              colors={["#D0E2FF", "#EAF0FF"]}
              style={styles.avatar}
            >
              <FeatherIcon name="user" size={45} color="#007AFF" />
            </LinearGradient>
            <Text style={styles.name}>{userData.username}</Text>
            <Text style={styles.employeeId}>ID: {userData.employee_id}</Text>
          </View>

          {/* --- Danh mục chức năng --- */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.lastMenuItem,
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.menuIconWrapper}>
                  <FeatherIcon name={item.icon} size={20} color="#007AFF" />
                </View>
                <Text style={styles.menuText}>{item.text}</Text>
                <FeatherIcon name="chevron-right" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>

          {/* --- Đăng xuất --- */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            activeOpacity={0.9}
          >
            <FeatherIcon name="log-out" color="#FF3B30" size={20} />
            <Text style={styles.signOutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },

  // --- Header ---
  profileHeader: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#007AFF",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1c1c1e",
  },
  employeeId: {
    fontSize: 15,
    color: "#8e8e93",
    marginTop: 4,
  },

  // --- Menu ---
  menuSection: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconWrapper: {
    backgroundColor: "#E6F0FF",
    borderRadius: 10,
    padding: 6,
    marginRight: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  // --- Sign out ---
  signOutButton: {
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  signOutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
