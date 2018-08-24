import { SET_DOCK_ITEM_ACTIVE, SET_FOOTER_VISIBILITY } from "./constants";

export const setDockItemActive = data => {
  return {
    type: SET_DOCK_ITEM_ACTIVE,
    data
  };
};

export const setFooterVisibility = data => {
  return {
    type: SET_FOOTER_VISIBILITY,
    data
  };
};
