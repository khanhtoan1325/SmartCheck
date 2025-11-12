import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useLoginLogic } from "../hooks/login";

export default function LoginScreen() {
  const {
    username,
    password,
    isLoading,
    showPassword,
    setUsername,
    setPassword,
    setShowPassword,
    handleLogin,
  } = useLoginLogic();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#1976D2", "#42A5F5", "#E3F2FD"]}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.wrapper}
        >
          <View style={styles.container}>
            {/* 🧿 Logo */}
            <Image
              source={require("../assets/images/hutech.jpg")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* 🏷 Tiêu đề */}
            <ThemedText style={styles.title}>Đăng Nhập</ThemedText>

            {/* --- Username --- */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Tên đăng nhập</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#aaa"
              />
            </View>

            {/* --- Password --- */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Mật khẩu</ThemedText>
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.icon}
                >
                  {showPassword ? (
                    <Feather name="eye-off" size={20} color="#666" />
                  ) : (
                    <Feather name="eye" size={20} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* --- Button --- */}
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>ĐĂNG NHẬP</ThemedText>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  container: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: -10,
    marginBottom: 20,
    textAlign: "center",
    color: "#0a7ea4",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  passwordInput: {
    position: "relative",
  },
  input: {
    backgroundColor: "#f9f9f9",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    position: "absolute",
    right: 16,
    top: 15,
  },
  button: {
    backgroundColor: "#0a7ea4",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
