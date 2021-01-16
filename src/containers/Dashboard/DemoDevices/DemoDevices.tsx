import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { IStoreState } from "../../../store/reducers";
import { TAwsEachDevice } from "../../../store/reducers/awsDevices";
import AwsSwitch from "../../../components/UI/AwsSwitch/AwsSwitch";

const DemoDevices = () => {
  const { awsDeviceData } = useSelector(
    (state: IStoreState) => state.awsDevices
  );

  interface IThisAwsDeviceData {
    deviceState: null | string;
    connected: boolean;
    controllState: null | string;
    controller: null | string;
    controllTime: null | number;
  }

  const [
    thisAwsDeviceData,
    setThisAwsDeviceData,
  ] = useState<IThisAwsDeviceData>({
    deviceState: null,
    connected: false,
    controllState: null,
    controller: null,
    controllTime: null,
  });

  useEffect(() => {
    const device = awsDeviceData.find((d) => {
      return d.id === "5f2027dba3188b07852881d8";
    });
    if (device) {
      const awsData: any = {};
      for (const key in device) {
        awsData[key] = device[key as TAwsEachDevice];
      }
      setThisAwsDeviceData(awsData);
    }
  }, [awsDeviceData]);

  return (
    <div>
      <div>These devices are controlled by AWS IoT</div>

      <div>
        <EmojiObjectsIcon
          color={
            thisAwsDeviceData.deviceState === "ON" ? "primary" : "disabled"
          }
        />
        <AwsSwitch state="ON" onChange={() => {}} />
        <p>Blue Led</p>
      </div>
      <div>
        <EmojiObjectsIcon />
        <p>Red Led</p>
      </div>
      <div>
        <EmojiObjectsIcon />
        <p>Yellow Led</p>
      </div>
    </div>
  );
};

export default DemoDevices;
