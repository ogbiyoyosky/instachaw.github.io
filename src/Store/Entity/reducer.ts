'use strict';

import { ActionTypes } from '@Constants';
import { IAction } from '@Interfaces';
import { IEntity } from '@Interfaces/Redux/Entity';

/**
 * INITIAL_STATE
*/
const INITIAL_STATE: IEntity.IStateProps = {
	stores: {}
};

type IMapPayload = IEntity.Actions.IMapPayload;

/**
 * REDUCER
*/
export const EntityReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
	switch (action.type) {
		case ActionTypes.Entity.SetReducer:
			return {
				...state,
				...action.payload
			};

		case ActionTypes.Entity.ResetReducer:
			return INITIAL_STATE;

		default:
			return state;
	}
};
