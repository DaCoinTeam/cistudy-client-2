"use client"
// import { Button, Spacer, Link, Card, CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
// import { LessonDetailsContext } from "../../../_hooks"
// import { LockClosedIcon } from "@heroicons/react/24/outline"
// import { parseISODateString } from "@common"

// export const QuizSection = () => {
//     const isWatched = true
//     const { swrs } = useContext(LessonDetailsContext)!
//     const { lessonsSwr } = swrs
//     const { data: lesson } = lessonsSwr
//     const { quiz } = { ...lesson }

//     return (
//         // <div>
//             <div className="text-2xl font-bold text-primary">Quiz</div>
//             <Spacer y={4} />
//             {quiz ? (
//                 <>
//                     <Card shadow="none" className="border divider">
//                         <CardBody className="p-4">
//                             <div className="font-bold">Details</div>
//                             <Spacer y={2} />
//                             <div>
//                                 <div className="text-sm">
//               Number of questions: {quiz?.questions.length}
//                                 </div>
//                                 <div className="text-sm">Time Limit: {quiz?.timeLimit} minutes</div>
//                                 <div className="text-sm">
//               Created on: {parseISODateString(quiz?.createdAt)}
//                                 </div>
//                             </div>
//                             {
//                                 quiz.totalNumberOfAttempts? (
//                                     <>
//                                         <Spacer y={4} />
//                                         <div className="font-bold">Your Performance</div>
//                                         <Spacer y={2} />
//                                         <div>
//                                             <div className="text-sm">
//                   Last Attempt Score: {quiz?.lastAttemptScore}
//                                             </div>
//                                             <div className="text-sm">
//                   Number of attempts: {quiz?.totalNumberOfAttempts}
//                                             </div>
//                                             <div className="text-sm">
//                   Highest score: {quiz?.highestScoreRecorded}/10
//                                             </div>
//                                         </div>
//                                     </>
//                                 ) : <></>
//                             }
//                             <Spacer y={4} />
//                             <div className="flex gap-2 items-center">
//                                 <Link isExternal href={`/quiz/${lesson?.lessonId}`}>
//                                     <Button
//                                         startContent={
//                                             !isWatched ? (
//                                                 <LockClosedIcon className="w-5 h-5" />
//                                             ) : undefined
//                                         }
//                                         isDisabled={!isWatched}
//                                         color="secondary"
//                                     >
//                 Take Quiz
//                                     </Button>
//                                 </Link>
//                                 {!isWatched ? (
//                                     <div className="text-danger text-sm">
//                 Please watch the course first.
//                                     </div>
//                                 ) : null}
//                             </div>
//                         </CardBody>
//                     </Card>

        
//                 </>
//             ) : (
//                 <div>The lesson does not have any quiz yet.</div>
//             )}
//         </div>
//     )
// }

export const QuizContent = () => {
    return (<div>Quiz</div>)
}