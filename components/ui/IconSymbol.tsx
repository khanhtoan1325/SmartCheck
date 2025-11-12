import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

// Ánh xạ giữa tên SF Symbols và tên Material Icons
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  user: "person", // Ánh xạ "user" sang "person"
  book: "book", // Ánh xạ "book" sang "book"
  bell: "notifications",
  "map.fill": "map",
} as const; // sử dụng `as const` để làm cho đối tượng này bất biến

type IconMapping = typeof MAPPING; // Định nghĩa kiểu IconMapping từ MAPPING
type IconSymbolName = keyof IconMapping; // Tên của biểu tượng phải là một trong các key của MAPPING

// Component IconSymbol sử dụng MAPPING để hiển thị biểu tượng
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name]; // Lấy tên biểu tượng từ MAPPING

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconName} // Sử dụng tên đã ánh xạ
      style={style}
    />
  );
}
