// Mock AdMob implementation for development
// Replace with real expo-ads-admob when package issues are resolved

const INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-3940256099942544/1033173712'; // Demo Ad Unit ID

export const initializeAdMob = async () => {
  try {
    console.log('AdMob mock initialized with demo ad unit:', INTERSTITIAL_AD_UNIT_ID);
    console.log('Note: Using mock AdMob - replace with real expo-ads-admob when available');
  } catch (error) {
    console.error('AdMob mock initialization failed:', error);
  }
};

export const loadInterstitialAd = async (): Promise<boolean> => {
  try {
    // Simulate ad loading time
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    console.log('Mock interstitial ad loaded successfully');
    return true;
  } catch (error) {
    console.error('Failed to load mock interstitial ad:', error);
    return false;
  }
};

export const showInterstitialAd = async (): Promise<boolean> => {
  try {
    console.log('Showing mock interstitial ad...');
    // Simulate ad display time
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    console.log('Mock interstitial ad shown successfully');
    return true;
  } catch (error) {
    console.error('Failed to show mock interstitial ad:', error);
    return false;
  }
};

export const showAdWithTimeout = async (timeoutSeconds: number = 5): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log(`Starting mock ad with ${timeoutSeconds} second timeout...`);

    // Simulate ad loading and display
    setTimeout(async () => {
      try {
        console.log('Mock ad displayed successfully');
        // Wait for the specified timeout
        setTimeout(() => {
          console.log(`Mock ad timeout of ${timeoutSeconds} seconds completed`);
          resolve(true);
        }, timeoutSeconds * 1000);
      } catch (error) {
        console.error('Mock ad failed:', error);
        resolve(false);
      }
    }, 500); // Small delay to simulate loading
  });
};