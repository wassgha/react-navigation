import { Animated, Easing, Platform } from 'react-native';
import StyleInterpolator from './StackViewStyleInterpolator';
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
  screenInterpolator: StyleInterpolator.forHorizontal,
  containerStyle: {
    backgroundColor: '#000',
  },
};

// Standard iOS navigation transition for modals
const ModalSlideFromBottomIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: StyleInterpolator.forVertical,
  containerStyle: {
    backgroundColor: '#000',
  },
};

function defaultTransitionConfig(
  transitionProps,
  prevTransitionProps,
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
  transitionProps,
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
