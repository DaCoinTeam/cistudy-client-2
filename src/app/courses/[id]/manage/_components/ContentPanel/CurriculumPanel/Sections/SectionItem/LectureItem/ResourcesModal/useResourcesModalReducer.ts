import { useReducer } from "react"
import { ResourceEntity } from "@common"

export interface ResourcesModalState {
    resources: Array<ResourceEntity>
}

export interface SetResourcesAction {
    type: "SET_RESOURCES";
    payload: Array<ResourceEntity>
}

export interface UpdateResourceAction {
    type: "UPDATE_RESOURCE";
    payload: ResourceEntity
}

export type ResourcesModalAction = SetResourcesAction | UpdateResourceAction;

export const state: ResourcesModalState = {
    resources: [],
}

export const reducer = (
    state: ResourcesModalState,
    action: ResourcesModalAction
) => {
    switch (action.type) {
    case "SET_RESOURCES":
        return { ...state, resources: action.payload }
    case "UPDATE_RESOURCE": {
        const updated = state.resources.filter(resource => {
            if (resource.resourceId === action.payload.resourceId) return action.payload
            return resource
        })
        return { ...state, resources: updated }
    }
    default:
        return state
    }
}

export const useResourcesModalReducer = () => {
    return useReducer(reducer, state)
}
