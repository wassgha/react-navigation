import { Animated, Easing, Platform } from 'react-native';
import CardStackStyleInterpolator from './CardStackStyleInterpolator';
import * as ReactNativeFeatures from '../../utils/ReactNativeFeatures';

let IOSTransitionSpec;
if (ReactNativeFeatures.supportsImprovedSpringAnimation()) {
  // These are the exact values from UINavigationController's animation configuration
  IOSTransitionSpec = {
    timing: Animated.spring,
    stiffness: 1000,
    damping: 500,
    mass: 3,
  };
} else {
  // This is an approximation of the IOS spring animation using a derived bezier curve
  IOSTransitionSpec = {
    duration: 500,
    easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
    timing: Animated.timing,
  };
}

// Standard iOS navigation transition
const SlideFromRightIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  containerStyle: {
    backgroundColor: '#000',
  },
};

// Standard iOS navigation transition for modals
const ModalSlideFromBottomIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: CardStackStyleInterpolator.forVertical,
  containerStyle: {
    backgroundColor: '#000',
  },
};

function defaultTransitionConfig(
  // props for the new screen
  transitionProps,
  // props for the old screen
  prevTransitionProps,
  // whether we're animating in/out a modal screen
  isModal
) {
  // iOS and other platforms
  if (isModal) {
    return ModalSlideFromBottomIOS;
  }
  return SlideFromRightIOS;
}

function getTransitionConfig(
  transitionConfigurer,
  // props for the new screen
  transitionProps,
  // props for the old screen
  prevTransitionProps,
  isModal
) {
  const defaultConfig = defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal
  );
  if (transitionConfigurer) {
    return {
      ...defaultConfig,
      ...transitionConfigurer(transitionProps, prevTransitionProps, isModal),
    };
  }
  return defaultConfig;
}

export default {
  defaultTransitionConfig,
  getTransitionConfig,
};
