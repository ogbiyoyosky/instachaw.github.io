import { ActionTypes } from "@Constants";

/**
 * ACTIONS
*/
export const AppActions = {
	Map : (payload:any) => ({
		payload,
		type: ActionTypes.App.SetReducer
	}),

	Reset : () => ({
		type: ActionTypes.App.ResetReducer
	})
}