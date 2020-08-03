import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";

interface AwsSwitchProps {
  state: "ON" | "OFF";
  onChange: (event: any) => void;
}

const AwsSwitch: React.FC<AwsSwitchProps> = props => {
  const { state, onChange } = props;

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    setIsSwitchOn(state === "ON" ? true : false);
  }, [state]);

  return (
    <div>
      <Switch
        checked={isSwitchOn}
        onChange={onChange}
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  );
};

export default AwsSwitch;
