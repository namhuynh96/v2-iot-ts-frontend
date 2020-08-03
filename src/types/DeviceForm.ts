import { DeviceTypes } from "./Device";

export type TAnalogConfigForm = {
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

export interface IDeviceForm {
  deviceName: {
    value: string;
    validation: {
      required: boolean;
      checkDuplicatedElementsInArray: boolean;
    };
    errorMessage: string | null;
    touched?: boolean;
  };
  deviceType: {
    value: DeviceTypes;
    errorMessage: null | string;
    touched?: boolean;
  };
  min?: TAnalogConfigForm;
  max?: TAnalogConfigForm;
  step?: TAnalogConfigForm;
  unit?: TAnalogConfigForm;
}
