import { ReactNode } from "react";

type SkeletonContainerProps = {
    className: string;
    children: ReactNode;
    isLoading: boolean;
}

const SkeletonContainer: React.FC<SkeletonContainerProps> = ({ className, children, isLoading }) => {
    if (isLoading) {
        return <div className={`bg-[var(--colors-gray-100)] rounded-sm ${className}`} />
    }

    return children
}

export default SkeletonContainer;