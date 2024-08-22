/* 本来templateディレクトリ配下ではないが、各セクションをページ単位と仮定する */
import React from 'react';

interface StyledSectionProps {
  legendName: string;
  children: React.ReactNode;
}

const StyledSection: React.FC<StyledSectionProps> = ({
  legendName,
  children,
}) => {
  return (
    <fieldset className="flex flex-col gap-4 my-5 p-5 bg-gray-200/30 backdrop-blur-lg rounded-md border border-gray-200/30 shadow-2xl">
      <legend className="whitespace-nowrap rounded-md px-2 py-1 text-white relative left-1/2 -translate-x-1/2 backdrop-blur-md shadow-lg bg-blue-950/80">
        {legendName}
      </legend>
      {children}
    </fieldset>
  );
};

export default StyledSection;
