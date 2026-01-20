import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bullseye.app',
  appName: '불스아이',
  webDir: 'out',
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#222222",
      showSpinner: false,
      // 중요: CENTER_CROP은 이미지를 늘리지만, CENTER는 이미지 크기 그대로 중앙에 둡니다.
    androidScaleType: "CENTER", 
    splashFullScreen: true,
    splashImmersive: true,
    },
  },
};

export default config;