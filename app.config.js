import * as dotenv from 'dotenv';
dotenv.config()
module.exports = {
  "expo": {
    "name": "ignite-fleet",
    "slug": "ignite-fleet",
    "scheme": "ignite-fleet",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#202024"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      // "bundleIdentifier": "com.rennand.ignitefleet",
      // "config": {
      //   "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      // }
      // ,
      // "infoPlist": {
      //   "UIBackgroundModes": ["location"]
      // }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#202024"
      },
      "package": "com.evandro.ignitefleet",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ],
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        } 
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },

    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "e24a1faf-0257-4ac7-8274-18a800b9b5a9"
      }
    }
  
  }
}
