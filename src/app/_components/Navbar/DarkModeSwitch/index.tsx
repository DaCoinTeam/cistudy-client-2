import { Switch } from "@nextui-org/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState, setDarkMode } from "@redux"
import { HiMoon ,  HiSun } from "react-icons/hi"

export const DarkModeSwitch = () => {
    const darkMode = useSelector((state: RootState) => state.configuration.darkMode)
    const dispatch: AppDispatch = useDispatch()

    const onValueChange = (value: boolean) => dispatch(setDarkMode(value))

    return (
        <Switch
            defaultSelected
            size="lg"
            color="primary"
            onValueChange={onValueChange}
            isSelected={darkMode}
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <HiMoon height={20} width={20} className={className} />
                ) : (
                    <HiSun height={20} width={20} className={className} />
                )
            }
        />
    )
}