import { ActionTypes } from "@Constants";

/**
 * ACTIONS
*/
export const HomeActions = {
	Map : (payload:any) => ({
		payload,
		type: ActionTypes.Home.SetReducer
	}),

	Reset : () => ({
		type: ActionTypes.Home.ResetReducer
	})
}