import type * as React from 'react';
import type { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type {
  NavigationProp,
  ParamListBase,
  Descriptor,
  Route,
  NavigationHelpers,
  StackNavigationState,
  StackActionHelpers,
  RouteProp,
} from '@react-navigation/native';
import type {
  HeaderBackButton,
  HeaderOptions,
} from '@react-navigation/elements';

export type StackNavigationEventMap = {
  /**
   * Event which fires when a transition animation starts.
   */
  transitionStart: { data: { closing: boolean } };
  /**
   * Event which fires when a transition animation ends.
   */
  transitionEnd: { data: { closing: boolean } };
  /**
   * Event which fires when navigation gesture starts.
   */
  gestureStart: { data: undefined };
  /**
   * Event which fires when navigation gesture is completed.
   */
  gestureEnd: { data: undefined };
  /**
   * Event which fires when navigation gesture is canceled.
   */
  gestureCancel: { data: undefined };
};

export type StackNavigationHelpers = NavigationHelpers<
  ParamListBase,
  StackNavigationEventMap
> &
  StackActionHelpers<ParamListBase>;

export type StackNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList
> = NavigationProp<
  ParamList,
  RouteName,
  StackNavigationState<ParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
> &
  StackActionHelpers<ParamList>;

export type StackScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList
> = {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

export type Layout = { width: number; height: number };

export type GestureDirection =
  | 'horizontal'
  | 'horizontal-inverted'
  | 'vertical'
  | 'vertical-inverted';

export type Scene = {
  /**
   * Descriptor object for the screen.
   */
  descriptor: StackDescriptor;
  /**
   * Animated nodes representing the progress of the animation.
   */
  progress: SceneProgress;
};

export type SceneProgress = {
  /**
   * Progress value of the current screen.
   */
  current: Animated.AnimatedInterpolation;
  /**
   * Progress value for the screen after this one in the stack.
   * This can be `undefined` in case the screen animating is the last one.
   */
  next?: Animated.AnimatedInterpolation;
  /**
   * Progress value for the screen before this one in the stack.
   * This can be `undefined` in case the screen animating is the first one.
   */
  previous?: Animated.AnimatedInterpolation;
};

export type StackHeaderMode = 'float' | 'screen';

export type StackCardMode = 'card' | 'modal';

export type StackHeaderOptions = HeaderOptions & {
  /**
   * Whether back button title font should scale to respect Text Size accessibility settings. Defaults to `false`.
   */
  headerBackAllowFontScaling?: boolean;
  /**
   * Accessibility label for the header back button.
   */
  headerBackAccessibilityLabel?: string;
  /**
   * ID to locate this back button in tests.
   */
  headerBackTestID?: string;
  /**
   * Title string used by the back button on iOS. Defaults to the previous scene's `headerTitle`.
   * Use `headerBackTitleVisible: false` to hide it.
   */
  headerBackTitle?: string;
  /**
   * Style object for the back title.
   */
  headerBackTitleStyle?: StyleProp<TextStyle>;
  /**
   * A reasonable default is supplied for whether the back button title should be visible or not.
   * But if you want to override that you can use `true` or `false` in this option.
   */
  headerBackTitleVisible?: boolean;
  /**
   * Title string used by the back button when `headerBackTitle` doesn't fit on the screen. `"Back"` by default.
   */
  headerTruncatedBackTitle?: string;
  /**
   * Function which returns a React Element to display custom image in header's back button.
   * It receives the `tintColor` in in the options object as an argument. object.
   * Defaults to Image component with a the default back icon image for the platform (a chevron on iOS and an arrow on Android).
   */
  headerBackImage?: React.ComponentProps<typeof HeaderBackButton>['backImage'];
};

export type StackHeaderProps = {
  /**
   * Layout of the screen.
   */
  layout: Layout;
  /**
   * Options for the back button.
   */
  back?: {
    /**
     * Title of the previous screen.
     */
    title: string;
  };
  /**
   * Animated nodes representing the progress of the animation.
   */
  progress: SceneProgress;
  /**
   * Options for the current screen.
   */
  options: StackNavigationOptions;
  /**
   * Route object for the current screen.
   */
  route: Route<string>;
  /**
   * Navigation prop for the header.
   */
  navigation: StackNavigationProp<ParamListBase>;
  /**
   * Interpolated styles for various elements in the header.
   */
  styleInterpolator: StackHeaderStyleInterpolator;
};

export type StackDescriptor = Descriptor<
  StackNavigationOptions,
  StackNavigationProp<ParamListBase>,
  RouteProp<ParamListBase>
>;

export type StackDescriptorMap = Record<string, StackDescriptor>;

export type StackNavigationOptions = StackHeaderOptions &
  Partial<TransitionPreset> & {
    /**
     * String that can be displayed in the header as a fallback for `headerTitle`.
     */
    title?: string;
    /**
     * Function that given `HeaderProps` returns a React Element to display as a header.
     */
    header?: (props: StackHeaderProps) => React.ReactNode;
    /**
     * Whether the header floats above the screen or part of the screen.
     * Defaults to `float` on iOS for non-modals, and `screen` for the rest.
     */
    headerMode?: StackHeaderMode;
    /**
     * Whether to show the header. The header is shown by default.
     * Setting this to `false` hides the header.
     */
    headerShown?: boolean;
    /**
     * Whether a shadow is visible for the card during transitions. Defaults to `true`.
     */
    cardShadowEnabled?: boolean;
    /**
     * Whether to have a semi-transparent dark overlay visible under the card during transitions.
     * Defaults to `true` on Android and `false` on iOS.
     */
    cardOverlayEnabled?: boolean;
    /**
     * Function that returns a React Element to display as a overlay for the card.
     */
    cardOverlay?: (props: {
      style: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    }) => React.ReactNode;
    /**
     * Style object for the card in stack.
     * You can provide a custom background color to use instead of the default background here.
     *
     * You can also specify `{ backgroundColor: 'transparent' }` to make the previous screen visible underneath.
     * This is useful to implement things like modal dialogs.
     * If you use [`react-native-screens`](https://github.com/kmagiera/react-native-screens), you should also specify `mode: 'modal'`
     * in the stack view config when using a transparent background so previous screens aren't detached.
     */
    cardStyle?: StyleProp<ViewStyle>;
    /**
     * Whether transition animation should be enabled the screen.
     * If you set it to `false`, the screen won't animate when pushing or popping.
     * Defaults to `true` on Android and iOS, `false` on Web.
     */
    animationEnabled?: boolean;
    /**
     * The type of animation to use when this screen replaces another screen. Defaults to `push`.
     * When `pop` is used, the `pop` animation is applied to the screen being replaced.
     */
    animationTypeForReplace?: 'push' | 'pop';
    /**
     * Whether you can use gestures to dismiss this screen. Defaults to `true` on iOS, `false` on Android.
     * Not supported on Web.
     */
    gestureEnabled?: boolean;
    /**
     * Distance of touch start from the edge of the screen to recognize gestures.
     * Not supported on Web.
     */
    gestureResponseDistance?: number;
    /**
     * Number which determines the relevance of velocity for the gesture. Defaults to 0.3.
     * Not supported on Web.
     */
    gestureVelocityImpact?: number;
    /**
     * Whether to detach the previous screen from the view hierarchy to save memory.
     * Set it to `false` if you need the previous screen to be seen through the active screen.
     * Only applicable if `detachInactiveScreens` isn't set to `false`.
     * Defaults to `false` for the last screen when mode='modal', otherwise `true`.
     */
    detachPreviousScreen?: boolean;
  };

export type StackNavigationConfig = {
  mode?: StackCardMode;
  /**
   * If `false`, the keyboard will NOT automatically dismiss when navigating to a new screen.
   * Defaults to `true`.
   */
  keyboardHandlingEnabled?: boolean;
  /**
   * Whether inactive screens should be detached from the view hierarchy to save memory.
   * Make sure to call `enableScreens` from `react-native-screens` to make it work.
   * Defaults to `true` on Android, depends on the version of `react-native-screens` on iOS.
   */
  detachInactiveScreens?: boolean;
};

export type TransitionSpec =
  | {
      animation: 'spring';
      config: Omit<
        Animated.SpringAnimationConfig,
        'toValue' | keyof Animated.AnimationConfig
      >;
    }
  | {
      animation: 'timing';
      config: Omit<
        Animated.TimingAnimationConfig,
        'toValue' | keyof Animated.AnimationConfig
      >;
    };

export type StackCardInterpolationProps = {
  /**
   * Values for the current screen.
   */
  current: {
    /**
     * Animated node representing the progress value of the current screen.
     */
    progress: Animated.AnimatedInterpolation;
  };
  /**
   * Values for the current screen the screen after this one in the stack.
   * This can be `undefined` in case the screen animating is the last one.
   */
  next?: {
    /**
     * Animated node representing the progress value of the next screen.
     */
    progress: Animated.AnimatedInterpolation;
  };
  /**
   * The index of the card in the stack.
   */
  index: number;
  /**
   * Animated node representing whether the card is closing (1 - closing, 0 - not closing).
   */
  closing: Animated.AnimatedInterpolation;
  /**
   * Animated node representing whether the card is being swiped (1 - swiping, 0 - not swiping).
   */
  swiping: Animated.AnimatedInterpolation;
  /**
   * Animated node representing multiplier when direction is inverted (-1 - inverted, 1 - normal).
   */
  inverted: Animated.AnimatedInterpolation;
  /**
   * Layout measurements for various items we use for animation.
   */
  layouts: {
    /**
     * Layout of the whole screen.
     */
    screen: Layout;
  };
  /**
   * Safe area insets
   */
  insets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export type StackCardInterpolatedStyle = {
  /**
   * Interpolated style for the container view wrapping the card.
   */
  containerStyle?: any;
  /**
   * Interpolated style for the view representing the card.
   */
  cardStyle?: any;
  /**
   * Interpolated style for the view representing the semi-transparent overlay below the card.
   */
  overlayStyle?: any;
  /**
   * Interpolated style representing the card shadow.
   */
  shadowStyle?: any;
};

export type StackCardStyleInterpolator = (
  props: StackCardInterpolationProps
) => StackCardInterpolatedStyle;

export type StackHeaderInterpolationProps = {
  /**
   * Values for the current screen (the screen which owns this header).
   */
  current: {
    /**
     * Animated node representing the progress value of the current screen.
     */
    progress: Animated.AnimatedInterpolation;
  };
  /**
   * Values for the current screen the screen after this one in the stack.
   * This can be `undefined` in case the screen animating is the last one.
   */
  next?: {
    /**
     * Animated node representing the progress value of the next screen.
     */
    progress: Animated.AnimatedInterpolation;
  };
  /**
   * Layout measurements for various items we use for animation.
   */
  layouts: {
    /**
     * Layout of the header
     */
    header: Layout;
    /**
     * Layout of the whole screen.
     */
    screen: Layout;
    /**
     * Layout of the title element.
     */
    title?: Layout;
    /**
     * Layout of the back button label.
     */
    leftLabel?: Layout;
  };
};

export type StackHeaderInterpolatedStyle = {
  /**
   * Interpolated style for the label of the left button (back button label).
   */
  leftLabelStyle?: any;
  /**
   * Interpolated style for the left button (usually the back button).
   */
  leftButtonStyle?: any;
  /**
   * Interpolated style for the right button.
   */
  rightButtonStyle?: any;
  /**
   * Interpolated style for the header title text.
   */
  titleStyle?: any;
  /**
   * Interpolated style for the header background.
   */
  backgroundStyle?: any;
};

export type StackHeaderStyleInterpolator = (
  props: StackHeaderInterpolationProps
) => StackHeaderInterpolatedStyle;

export type TransitionPreset = {
  /**
   * The direction of swipe gestures, `horizontal` or `vertical`.
   */
  gestureDirection: GestureDirection;
  /**
   * Object which specifies the animation type (timing or spring) and their options (such as duration for timing).
   */
  transitionSpec: {
    /**
     * Transition configuration when adding a screen.
     */
    open: TransitionSpec;
    /**
     * Transition configuration when removing a screen.
     */
    close: TransitionSpec;
  };
  /**
   * Function which specifies interpolated styles for various parts of the card, e.g. the overlay, shadow etc.
   */
  cardStyleInterpolator: StackCardStyleInterpolator;
  /**
   * Function which specifies interpolated styles for various parts of the header, e.g. the title, left button etc.
   */
  headerStyleInterpolator: StackHeaderStyleInterpolator;
};
