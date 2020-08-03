export enum DeviceTypes {
  analog = "analog",
  digital = "digital"
}

// export interface IDeviceConfigs {
//   type: DeviceTypes;
//   min?: number;
//   max?: number;
//   step?: number;
//   unit?: string;
// }

// export interface IDeviceData {
//   _id: string;
//   name: string;
//   configs: IDeviceConfigs;
// }

// export type TAnalogConfigKeys = "min" | "max" | "step" | "unit";

type TAnalogConfigForm = {
  elementType: string;
  elementConfig: {
    type: string;
    label: string;
  };
  value: string;
  validation: {
    required?: boolean;
  };
  errorMessage: null | string;
  touched: boolean;
};

export interface IAnalogConfigs {
  min: TAnalogConfigForm;
  max: TAnalogConfigForm;
  step: TAnalogConfigForm;
  unit: TAnalogConfigForm;
}

export interface IDeviceForm {
  deviceName: {
    value: string;
    validation: {
      required: boolean;
      checkDuplicatedElementsInArray: boolean;
    };
    errorMessage: string | null;
    touched: boolean;
  };
  deviceType: {
    value: DeviceTypes;
    errorMessage: null | string;
    touched: boolean;
  };
  min?: TAnalogConfigForm;
  max?: TAnalogConfigForm;
  step?: TAnalogConfigForm;
  unit?: TAnalogConfigForm;
}
