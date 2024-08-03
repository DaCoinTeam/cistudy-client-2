import { Formik, FormikProps } from "formik"
import { ReactNode, createContext, useContext, useState } from "react"
import * as Yup from "yup"
import { ToastType } from "../../../../../../_components"
import { RootContext } from "../../../../../../_hooks"
import { CourseDetailsContext } from "../../../../_hooks"
import { createCourseReview } from "@services"

interface ReviewInputContextValue {
  formik: FormikProps<FormikValues>;
}

interface FormikValues {
  rating: number;
  content: string;
}

export const ReviewInputContext = createContext<ReviewInputContextValue | null>(
    null
)

const WrappedFormikProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <ReviewInputContext.Provider value={{ formik }}>
        {children}
    </ReviewInputContext.Provider>
)

export const ReviewInputProvider = ({ children }: { children: ReactNode }) => {
    const [initialValues] = useState<FormikValues>({
        rating: 0,
        content: "",
    })
    const { notify } = useContext(RootContext)!

    const {
        swrs: courseDetailSwrs,
        reducer: { "1": dispatch },
    } = useContext(CourseDetailsContext)!
    const { courseSwr } = courseDetailSwrs
    const { data: course, mutate } = courseSwr
    const { courseId } = { ...course }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                rating: Yup.number().min(1).max(5).required("Rating is required"),
                content: Yup.string()
                    .min(10, "Review must be longer than 10 characters")
                    .max(1000, "Review must be less than 1000 characters")
                    .required("Review content is required"),
            })}
            enableReinitialize
            onSubmit={async ({ rating, content }) => {
                const { message } = await createCourseReview({
                    data: {
                        courseId: courseId ? courseId : "",
                        rating,
                        content,
                    },
                })

                await mutate()

                dispatch({
                    type: "SET_REFRESH_REVIEW_KEY",
                })

        notify!({
            data: { message },
            type: ToastType.Success,
        })
            }}
        >
            {(formik) => (
                <WrappedFormikProvider formik={formik}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}
