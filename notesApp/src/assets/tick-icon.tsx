import React from 'react';
import Svg, {Path} from 'react-native-svg';

type TickIconProps = {
  // Define any specific props you expect to receive
  width?: number;
  height?: number;
};

const TickIcon: React.FC<TickIconProps> = props => {
  return (
    <Svg width="40px" height="40px" viewBox="0 0 24 24" {...props}>
      <Path
        d="M20.71 6.3l-5-5h-.005A1.1 1.1 0 0015 1H4a1 1 0 00-1 1v20a1 1 0 001 1h16a1 1 0 001-1V7a1.081 1.081 0 00-.29-.7zM19 21H5V3h9v4a1 1 0 001 1h4zm-3.293-10.707a1 1 0 010 1.414l-4 4a1 1 0 01-1.347.061l-2-1.666a1 1 0 011.28-1.537l1.3 1.082 3.355-3.354a1 1 0 011.412 0z"
        fill="green"
      />
    </Svg>
  );
};

export default TickIcon;
