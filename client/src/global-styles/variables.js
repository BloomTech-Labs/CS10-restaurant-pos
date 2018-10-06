// * Root Colors ----------------------
const transparent = 'rgba(0, 0, 0, 0)';
const santasGrey = 'rgba(46, 49, 72, 0.4)';
const midGrey = 'rgba(46, 49, 72, 0.75)';
const lightGrey = 'rgba(255, 255, 255, 0.4)';
const lightWhite = 'rgba(255, 255, 255, 0.75)';
const white = '#FFFFFF';
const aquaHaze = '#F6F8FB';
const oxfordBlue = '#303B49';
const comet = '#5F6273';
const steelBlue = '#4381C1';
const ebonyClay = '#202233';
const silver = '#C6C6C6';
const wispPink = '#FDEFF5';
const porcelain = '#EDEFF0';
const limedSpruce = '#363F49';
const eden = '#114B5F';
const cosmic = '#803952';
const athensGrey = '#EDEFF2';
const catskillWhite = '#FCFCFC';

const themeColor = localStorage.getItem('themeColor');
const razzmatazz = themeColor || '#E30E58';

export const theme = {
  // * Misc. -----------------------------------
  menuOpacity: null,
  lineHeight: null,
  boxShadow: '0 2px 16px 1px rgba(0, 0, 0, 0.15)',
  catMenuBorderRadius: 25,
  categoryBorderRadius: 15,

  // * Default Dimensions ----------------------
  mainContainerPaddingTopBottom: '60px',
  mainContainerPaddingRightLeft: '100px',
  sideBarWidth: 265,
  topBarHeight: 100,
  menuItemSize: 200,
  settingCardHeight: 500,
  settingCardMaxWidth: 450,
  settingCardPadding: '0 70px',
  settingCardMargin: '20px 50px 50px 50px',

  // * Card Styles -----------------------------
  cardBorderRadius: 18,

  // * Font Styles -----------------------------
  ItemTitleSize: 2,
  ItemPriceSize: 1.7,
  ItemTitleDescription: 1.4,
  placeholderColor: silver,
  freeTableNumberSize: 4,
  h1: 2.4,

  // * Buttons ---------------------------------
  // Standard
  btnWidth: 170,
  btnHeight: 47,
  btnBorderRadius: 25,
  btnFontSize: 1.6,
  btnTextColor: white,
  btnBgColor: transparent,
  btnBorderColor: steelBlue,

  // Primary
  btnPrimaryBgColor: steelBlue,

  // Dark Primary
  btnDarkPrimaryBgColor: razzmatazz,

  // Dark
  btnDarkBorderColor: white,

  // * Color Theme Variables -------------------
  // Primary Styles
  appPrimary: white,
  appSecondary: razzmatazz,
  appTertiary: oxfordBlue,
  contentBackground: aquaHaze,
  contentBackgroundDarker: athensGrey,
  contentBackgroundLighter: catskillWhite,
  textColorDark: white,
  inputError: wispPink,
  menuBg: porcelain,
  selectedTable: eden,
  navTabColor: limedSpruce,
  deleteColor: cosmic,
  // Top Bar
  topBarLink: comet,
  // Side Bar
  linkSelectedBg: null,
  linkSelected: null,
  linkHoverBg: null,
  linkHover: null,
  // Main Styles
  textColor: null,
  buttonBorder: null,
  // Sub Headers
  subHeader: null,
  // Text
  primaryText: ebonyClay,
  lightText: santasGrey,
  medTextLight: midGrey,
  medText: lightWhite,
  lightTextOnDark: lightGrey,
};
