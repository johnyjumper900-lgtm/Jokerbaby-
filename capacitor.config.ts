import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fcdor.magic",
  appName: "FC d'Or",
  webDir: "dist",
  bundledWebRuntime: false,
  ios: {
    contentInset: "always",
    backgroundColor: "#0a0a0f",
  },
  server: {
    // Allow self-signed dev servers if you ever live-reload from Mac.
    // For prod IPA the bundled web assets are served from the app.
    androidScheme: "https",
    iosScheme: "capacitor",
  },
};

export default config;
