import { SET_SIDE_BAR_MENU } from "../types";
import { colors } from "./../../components/colors";
//?the initial state of our state management system
const initialState = {
  SideBarState: [
    {
      name: "fork",
      color: colors.white,
      size: 40,
      active: true,
      primary: true,
      moveTo: "Main",
    },
    {
      name: "customerservice",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Home",
    },

    {
      name: "flag",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Orders",
    },

    {
      name: "sharealt",
      color: colors.primary,
      size: 25,
      active: false,
      moveTo: "Settings",
    },
  ],
};

//?the reducer function that will be used to update the state of our state management system based on the action type and the payload
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDE_BAR_MENU:
      return {
        ...state,
        SideBarState: action.payload,
      };
    default:
      return state;
  }
}
