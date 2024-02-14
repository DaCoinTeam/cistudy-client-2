// "use client"
// import React, {
//     ReactNode,
//     createContext,
//     useCallback,
//     useContext,
//     useEffect,
//     useMemo,
// } from "react"

// import {
//     TargetsAction,
//     TargetsState,
//     useTargetsReducer,
// } from "./useTargetsReducer"
// import { CourseDetailsContext } from "../../../../_hooks"
// import { createCourseTarget } from "@services"
// import { isErrorResponse } from "@common"

// export interface TargetsContextValue {
//   state: TargetsState;
//   dispatch: React.Dispatch<TargetsAction>;
//   functions: {
//     createTarget: (target: string) => void;
//   };
// }

// export const TargetsContext = createContext<TargetsContextValue | null>(null)

// export const TargetsProviders = ({ children }: { children: ReactNode }) => {
//     const [state, dispatch] = useTargetsReducer()
//     const { state: courseDetailsState, functions } =
//     useContext(CourseDetailsContext)!
//     const { course } = courseDetailsState
//     const { fetchAndSetCourse } = functions

//     const createTarget = useCallback(async (content: string) => {
//         if (course === null) return
//         const { courseId } = course
//         if (!courseId) return 

//         const response = await createCourseTarget({
//             data: {
//                 courseId,
//                 content
//             },
//         })

//         if (!isErrorResponse(response)) {
//             await fetchAndSetCourse()
//         } else {
//             console.log(response)
//         }
//     }, [state.keyTargets])

//     useEffect(() => {
//         const targets = courseDetailsState.course?.targets
//         if (!targets) return

//         const keyTargets = (
//             targets as Array<string>
//         ).map((value, key) => ({
//             key,
//             value,
//         }))
        
//         dispatch({
//             type: "SET_KEY_TARGETS",
//             payload: keyTargets,
//         })
//     }, [courseDetailsState.course?.targets])

//     const TargetsContextValue: TargetsContextValue = useMemo(
//         () => ({
//             state,
//             dispatch,
//             functions: {
//                 createTarget,
//             },
//         }),
//         [state, dispatch]
//     )

//     return (
//         <TargetsContext.Provider value={TargetsContextValue}>
//             {children}
//         </TargetsContext.Provider>
//     )
// }
