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
    <fieldset className="my-5 rounded-md border border-gray-200/30 bg-gray-200/30 p-5 shadow-2xl backdrop-blur-lg">
      <legend className="relative left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-blue-950/80 px-2 py-1 text-white shadow-lg backdrop-blur-md">
        {legendName}
      </legend>
      {children}
    </fieldset>
  );
};

export default StyledSection;
