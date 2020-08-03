export enum DeviceTypes {
  analog = "analog",
  digital = "digital"
}

export interface IDeviceConfigs {
  type: DeviceTypes;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface IDeviceData {
  _id: string;
  name: string;
  configs: IDeviceConfigs;
}

export type TAnalogConfigKeys = "min" | "max" | "step" | "unit";
