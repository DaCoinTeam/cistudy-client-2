import { Button, Input, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    ConfigurationPanelContext,
    ConfigurationPanelProvider,
} from "./ConfigurationPanelProvider"
import dayjs from "dayjs"

interface ConfigurationPanelProps {
  className?: string;
}

const WrappedConfigurationPanel = ({ className }: ConfigurationPanelProps) => {
    const { formik, swrs } = useContext(ConfigurationPanelContext)!
    const { configurationSwr: { data } } = swrs

    return (
        <div className={`${className} col-span-3`}>
            <div className="text-2xl">Configuration</div>
            <Spacer y={6} />
            <div className="grid gap-4 w-full">
                <Input
                    label="Earn Percent"
                    id="earn"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement="outside"
                    placeholder="Input earn percent here"
                    value={formik.values.earn.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.errors.earn)}
                    errorMessage={formik.errors.earn}
                    endContent={<div className="text-foreground-400">%</div>}
                />
                <Input
                    label="Completed Percent"
                    id="completed"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement="outside"
                    placeholder="Input completed percent here"
                    value={formik.values.completed.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.errors.completed)}
                    errorMessage={formik.errors.completed}
                    endContent={<div className="text-foreground-400">%</div>}
                />
                <Input
                    label="Foundation Percent"
                    id="foundation"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement="outside"
                    placeholder="Input foundation percent here"
                    value={formik.values.foundation.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.errors.foundation)}
                    errorMessage={formik.errors.foundation}
                    endContent={<div className="text-foreground-400">%</div>}
                />
                <Input
                    label="Instructor Percent"
                    id="instructor"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    labelPlacement="outside"
                    placeholder="Input earn percent here"
                    value={(formik.values.instructor).toString()}
                    readOnly
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.errors.instructor)}
                    errorMessage={formik.errors.instructor}
                    endContent={<div className="text-foreground-400">%</div>}
                />
            </div>
            <Spacer y={6}/>
            <Button isLoading={formik.isSubmitting} color="primary" type="submit"> Apply Changes </Button>
            <Spacer y={12}/>
            {
                data ?
                    <div>
                        <div className="text-success text-sm"> Configuration changes will be applied in {dayjs(new Date(data?.appliedAt)).format("YYYY MMM, DD")}. </div>
                        <Spacer y={4}/>
                        <div className="grid gap-1 p-4 border border-divider rounded-medium">
                            <div className="font-semibold">Upcoming Configuration</div>
                            <div>Earn: {data.earn} %</div>
                            <div>Completed: {data.completed} %</div>
                            <div>Foundation: {data.foundation} %</div>
                            <div>Instructor: {data.instructor} %</div>
                        </div>
                    </div>  
                    : null
            }
        </div>
    )
}

export const ConfigurationPanel = (props: ConfigurationPanelProps) => {
    return (
        <ConfigurationPanelProvider>
            <WrappedConfigurationPanel {...props} />
        </ConfigurationPanelProvider>
    )
}
