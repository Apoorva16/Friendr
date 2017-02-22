# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css

  rootView:
    location: "home#index"


  drawers:
    left:
      id: "leftDrawer"
      location: "example#drawer"
      showOnAppLoad: false
    options:
      animation: "slide"

  initialView:
    id: "initialView"
    location: "example#initial-view"
