import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";

interface AwsSliderProps {
  configs: {
    max: number;
    min: number;
    step: number;
    unit: string;
  };
  onChangeCommitted: (event: any, value: number | number[]) => void;
  state: number;
}

const AwsSlider: React.FC<AwsSliderProps> = props => {
  const { state, onChangeCommitted, configs } = props;

  const [value, setValue] = useState(state);
  useEffect(() => {
    if (state) {
      setValue(state);
    }
  }, [state]);

  const { max, min, step, unit } = configs;
  const marks = [];
  for (let i = min; i <= max; i = i + step) {
    marks.push({ value: i, label: `${i} ${unit}` });
  }

  return (
    <div>
      <Slider
        value={value}
        step={step}
        marks={marks}
        min={min}
        max={max}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay="on"
      />
    </div>
  );
};

export default AwsSlider;
