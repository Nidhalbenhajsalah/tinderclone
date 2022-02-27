import { createSelector } from 'reselect';
const homePageState = (state) => state.homePage;

export const makeSelectUser = createSelector(homePageState, homePage => homePage.user);