import React from "react";

interface StatusViewProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const StatusView = ({ title, description, icon, children }: StatusViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        {icon}
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>
      <div className="flex gap-6 items-center mt-6">{children}</div>
    </div>
  );
};

export default StatusView;
