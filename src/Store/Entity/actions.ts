'use strict';

import { ActionTypes } from "@Constants";

/**
 * ACTIONS
*/
export const EntityActions = {
	Map : (payload:any) => ({
		payload,
		type: ActionTypes.Entity.SetReducer
	}),

	Reset : () => ({
		type: ActionTypes.Entity.ResetReducer
	}),
}