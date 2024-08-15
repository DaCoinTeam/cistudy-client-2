import { Spacer } from "@nextui-org/react"
import { ExperienceSection } from "./ExperienceSection"
import { QualificationSection } from "./QualificationSection"

export const WorkExperienceTabContent = () => {

    return (
        <div>
            <QualificationSection />
            <Spacer y={6} />
            <ExperienceSection />
        </div>
    )
}