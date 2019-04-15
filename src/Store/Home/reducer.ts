'use strict';

import { ActionTypes } from '@Constants';
import { IAction, IHomePage } from '@Interfaces';

/**
 * INITIAL_STATE
*/
const INITIAL_STATE: IHomePage.IStateProps = { };

type IMapPayload = IHomePage.Actions.IMapPayload;

/**
 * REDUCER
*/
export const HomeReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
	switch (action.type) {
		case ActionTypes.Home.SetReducer:
			return {
				...state,
				...action.payload
			};

		case ActionTypes.Home.ResetReducer:
			return INITIAL_STATE;

		default:
			return state;
	}
};
