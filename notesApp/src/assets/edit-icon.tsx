import React from 'react';
import Svg, {Path, G} from 'react-native-svg';

type EditIconProps = {
  width?: number;
  height?: number;
};

const EditIcon: React.FC<EditIconProps> = props => {
  return (
    <Svg width="20px" height="20px" viewBox="0 0 24 24" {...props}>
      <G
        fill="none"
        stroke="blue"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}>
        <Path d="M20 16v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h4" />
        <Path d="M12.5 15.8L22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8z" />
      </G>
    </Svg>
  );
};

export default EditIcon;
