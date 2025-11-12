import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("vi");

// Định nghĩa kiểu dữ liệu
export type Schedule = {
  schedule_id: number;
  work_date: string;
  start_time: string;
  end_time: string;
  status: "PLANNED" | "UPDATED" | "CANCELLED";
};

// Hàm định dạng ngày
export const formatDate = (dateStr: string): string => {
  return dayjs(dateStr).tz("Asia/Ho_Chi_Minh").format("dddd, DD/MM/YYYY");
};

// Hàm lấy màu tương ứng với trạng thái
export const getStatusColor = (
  status: "PLANNED" | "UPDATED" | "CANCELLED"
): { color: string } => {
  switch (status) {
    case "PLANNED":
      return { color: "green" };
    case "UPDATED":
      return { color: "orange" };
    case "CANCELLED":
      return { color: "red" };
    default:
      return { color: "#000" };
  }
};
