import { FC } from "react";

export const PlaceholderBlock: FC = ({}) => {
    return (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
            <span className="text-5xl text-gray-400">Placeholder</span>
        </div>
    );
};

export const renderPlaceholder = () => <PlaceholderBlock />;
