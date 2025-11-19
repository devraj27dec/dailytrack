import type React from "react";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>
    {children}
  </div>;
};
