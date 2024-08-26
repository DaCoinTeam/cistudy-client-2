import { Button, Input, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    ConfigurationPanelContext,
    ConfigurationPanelProvider,
} from "./ConfigurationPanelProvider"
import { Pie, Cell, Legend, Tooltip as ChartTooltip, PieChart } from "recharts"

interface ConfigurationPanelProps {
  className?: string;
}

const WrappedConfigurationPanel = ({ className }: ConfigurationPanelProps) => {
    const { formik } = useContext(ConfigurationPanelContext)!

    const pieData = [
        { name: "Instructor", value: formik.values.instructor },
        { name: "Earn", value: formik.values.earn },
        { name: "Completed", value: formik.values.completed },
        { name: "Foundation", value: formik.values.foundation },
    ]
    const COLORS = ["#006FEE", "#9353d3", "#17c964", "#f5a524"]
    
    return (
        <div className={`${className} col-span-3`}>
            <div className="text-2xl">Configuration</div>
            <div className="p-4 h-[500px]">
                <div className="grid grid-cols-2 gap-4">
                    <PieChart width={400} height={400}>
                        <Pie
                            label
                            data={pieData}
                            cx={120}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartTooltip formatter={(value, name) => [`${value}%`, name]}/>
                        <Legend/>
                    </PieChart>
                    <div>
                        <div className="font-semibold">Distribution</div>
                        <Spacer y={2}/>
                        <div>
                                Instructor: {formik.values.instructor}%
                        </div>
                        <div className="text-sm text-foreground-400">
                                This is the amount of STARCI allocated to instructors when a course is created.
                        </div>
                        <Spacer y={1}/>
                        <div>
                                Earn: {formik.values.earn}%
                        </div>
                        <div className="text-sm text-foreground-400">
                                This is the amount of STARCI awarded to students when they create posts, like, comment, and engage in other activities.
                        </div>
                        <Spacer y={1}/>
                        <div>
                                Completed: {formik.values.completed}%
                        </div>
                        <div className="text-sm text-foreground-400">
                                This is the amount of STARCI granted upon the completion of the course.
                        </div>
                        <Spacer y={1}/>
                        <div>
                                Foundation: {formik.values.foundation}%
                        </div>
                        <div className="text-sm text-foreground-400">
                                This is the amount of STARCI allocated to us, the founders, for the application foundation.
                        </div>
                    </div>
                </div>    
            </div>
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
                    label="Instructor Percent"
                    id="instructor"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    isReadOnly
                    labelPlacement="outside"
                    placeholder="Input earn percent here"
                    value={(formik.values.instructor).toString()}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.errors.instructor)}
                    errorMessage={formik.errors.instructor}
                    endContent={<div className="text-foreground-400">%</div>}
                />
                <Input
                    label="Foundation Percent"
                    id="foundation"
                    isRequired
                    classNames={{
                        inputWrapper: "input-input-wrapper",
                    }}
                    readOnly
                    labelPlacement="outside"
                    placeholder="Input foundation percent here"
                    value={formik.values.foundation.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.errors.foundation)}
                    errorMessage={formik.errors.foundation}
                    endContent={<div className="text-foreground-400">%</div>}
                    description="Only administrator can configure foundation percent"
                />
            </div>
            <Spacer y={6} />
            <Button isLoading={formik.isSubmitting} color="primary" type="submit"> Apply Changes </Button>
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
