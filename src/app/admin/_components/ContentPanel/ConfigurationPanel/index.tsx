import { Button, Divider, Input, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import {
    ConfigurationPanelContext,
    ConfigurationPanelProvider,
} from "./ConfigurationPanelProvider"
import { PieChart } from "lucide-react"
import { Pie, Cell, Legend, Tooltip as ChartTooltip } from "recharts"

interface ConfigurationPanelProps {
  className?: string;
}

const WrappedConfigurationPanel = ({ className }: ConfigurationPanelProps) => {
    const { formik } = useContext(ConfigurationPanelContext)!

    return (
        <div className={`${className} col-span-3`}>
            <div className="text-2xl">Configuration</div>
            <Spacer y={6} />
            <div className="grid gap-4 w-full">
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
