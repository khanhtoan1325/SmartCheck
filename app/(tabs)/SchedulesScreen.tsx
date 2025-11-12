import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  formatDate,
  getStatusColor,
  Schedule,
} from "../../hooks/scheduleUtils";
import { API_BASE_URL } from "../../routes/config";

export default function SchedulesScreen() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const employeeId = 1;

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get<Schedule[]>(
          `${API_BASE_URL}/schedule/${employeeId}`
        );
        setSchedule(res.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <View style={styles.container}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.title}>📅 Lịch Làm Việc</Text>
        <View style={styles.subHeader}>
          <FeatherIcon name="calendar" size={18} color="#e3f2fd" />
          <Text style={styles.subText}>Lịch làm việc chi tiết theo ngày</Text>
        </View>
      </View>

      {/* --- NỘI DUNG --- */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1e88e5"
          style={{ marginTop: 50 }}
        />
      ) : (
        <ScrollView style={styles.content}>
          {schedule.length === 0 ? (
            <Text style={styles.noData}>Không có lịch làm việc nào.</Text>
          ) : (
            schedule.map((item) => (
              <TouchableOpacity
                key={item.schedule_id}
                style={styles.card}
                activeOpacity={0.8}
              >
                <View style={styles.rowBetween}>
                  <Text style={styles.date}>{formatDate(item.work_date)}</Text>
                  <Text style={[styles.status, getStatusColor(item.status)]}>
                    {item.status}
                  </Text>
                </View>

                <View style={styles.row}>
                  <FeatherIcon name="clock" size={16} color="#607d8b" />
                  <Text style={styles.time}>
                    {item.start_time} - {item.end_time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef5ff", // nền xanh nhạt dễ nhìn
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
    backgroundColor: "#1e88e5",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#bbdefb",
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#1e88e5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e88e5",
  },
  time: {
    marginLeft: 8,
    fontSize: 15,
    color: "#555",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  noData: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#777",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
