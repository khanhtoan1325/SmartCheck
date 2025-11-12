import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "like",
      message: "Toan đã thích bài viết của bạn ❤️",
      time: "2 phút trước",
      iconName: "heart",
      color: "#ff4757",
    },
    {
      id: 2,
      type: "comment",
      message: "Sarah đã bình luận vào ảnh của bạn 💬",
      time: "15 phút trước",
      iconName: "message-circle",
      color: "#1e90ff",
    },
    {
      id: 3,
      type: "favorite",
      message: "Bài viết của bạn đã được chọn nổi bật 🌟",
      time: "1 giờ trước",
      iconName: "star",
      color: "#ffa502",
    },
  ];

  return (
    <LinearGradient colors={["#e3f2fd", "#bbdefb"]} style={styles.background}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Thông báo</Text>
          <FeatherIcon name="bell" size={26} color="#1565c0" />
        </View>

        {/* NỘI DUNG THÔNG BÁO */}
        <ScrollView style={styles.content}>
          {notifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.notificationCard}
              activeOpacity={0.8}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
              >
                <FeatherIcon name={item.iconName} size={20} color="#fff" />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* --- PHẦN GIỚI THIỆU ỨNG DỤNG --- */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>✨ GIỚI THIỆU VỀ ỨNG DỤNG</Text>
            <Text style={styles.aboutText}>
              Ứng dụng giúp người dùng quản lý thời gian làm việc, chấm công
              nhanh chóng và nhận thông báo kịp thời. Thiết kế thân thiện, dễ sử
              dụng và trực quan để tối ưu hiệu suất công việc mỗi ngày.
            </Text>

            <View style={styles.developerBox}>
              <Text style={styles.devTitle}>👨‍💻 ĐỘI NGŨ PHÁT TRIỂN :</Text>
              <Text style={styles.devName}>• Nguyễn Khánh Toàn</Text>
              <Text style={styles.devName}>• Nguyễn Nhật Hà</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565c0",
  },
  content: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: "#777",
  },

  // --- PHẦN GIỚI THIỆU ---
  aboutSection: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 16,
  },
  developerBox: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  devTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1565c0",
    marginBottom: 6,
  },
  devName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
});
