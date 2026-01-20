import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bullseye.app',
  appName: '불스아이',
  webDir: 'out',
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, 
      // 👇 이 부분을 수정하세요! (#F1F5F9 -> #222222)
      backgroundColor: "#222222", 
      showSpinner: false, 
      androidScaleType: "CENTER_CROP", // 로고가 꽉 차게 나옵니다
    },
  },
};

export default config;