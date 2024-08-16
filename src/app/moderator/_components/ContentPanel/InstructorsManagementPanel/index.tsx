export interface InstructorsManagementPanelProps {
    className?: string;
}

export const InstructorsManagementPanel = (props: InstructorsManagementPanelProps) => {
    const { className } = props

    return (
        <div className={`${className}`}>
            Instructor
        </div>
    )
}