import { useContext } from "react"
import { Button, Textarea } from "@nextui-org/react"
import { ReviewInputContext, ReviewInputProvider } from "./ReviewInputProvider"
import { Stars } from "../../../../../../_shared"

const ReviewInputWrapped = () => {
    const { formik } = useContext(ReviewInputContext)!

    return (
        <div className='mb-2'>
            <div className='mb-2'>
                <Stars
                    key={formik.values.rating}
                    onClick={(value) => formik.setFieldValue("rating", value)}
                />
            </div>
            <div className='mb-2 w-1/2'>
                <Textarea
                    id='content'
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement='outside'
                    placeholder='What do you think about this course ?'
                    value={formik.values.content}
                    onChange={formik.handleChange("content")}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.content && formik.errors.content)}
                    errorMessage={formik.touched.content && formik.errors.content}
                />
            </div>

            <div className='mb-2'>
                <Button
                    type='submit'
                    color='primary'
        
                    onPress={() => formik.handleSubmit()}
                >Submit</Button>
            </div>
        </div>
    )
}

export const ReviewInput = () => {
    return (
        <ReviewInputProvider>
            <ReviewInputWrapped />
        </ReviewInputProvider>
    )
}
