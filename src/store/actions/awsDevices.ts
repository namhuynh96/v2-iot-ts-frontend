import { ActionTypes } from "./types/actionTypes";
import { PubSub } from "aws-amplify";
import { updateObject } from "../../shared/utility";
import { Dispatch } from "redux";
import { IAwsDeviceData } from "./types/awsDeviceActions";

const setAwsDeviceData = (data: IAwsDeviceData) => {
  return {
    type: ActionTypes.SET_AWS_DEVICE_DATA,
    data
  };
};

export const iotSubcribe = (deviceIdsArray: string[]) => {
  return (dispatchEvent: Dispatch) => {
    for (const id of deviceIdsArray) {
      const topic = `$aws/things/${id}/shadow/update/documents`;
      PubSub.subscribe(topic).subscribe({
        next: ({ value }: any) => {
          let awsDeviceData: IAwsDeviceData = {
            id,
            deviceState: null,
            controllState: null,
            controller: null,
            controllTime: null
          };
          if (value.current.state) {
            const { reported, desired } = value.current.state;
            if (reported) {
              const { state, controller, connected } = reported;
              awsDeviceData = updateObject(awsDeviceData, {
                deviceState: connected ? state : "disconnected",
                connected,
                controller,
                controllState: state,
                controllTime:
                  state && value.current.metadata.reported.state.timestamp
              });
            }
            if (desired) {
              const { state, controller } = desired;
              awsDeviceData = updateObject(awsDeviceData, {
                controller,
                controllState: state,
                controllTime: value.current.metadata.desired.state.timestamp
              });
            }
          }
          dispatchEvent(setAwsDeviceData(awsDeviceData));
        },
        error: (error: any) => console.error(error),
        complete: () => console.log("Done")
      });
    }
  };
};

export const getInitialState = (deviceIdsArray: string[]) => {
  return (dispatchEvent: Dispatch) => {
    for (const id of deviceIdsArray) {
      const topic = `$aws/things/${id}/shadow/get/accepted`;
      PubSub.subscribe(topic).subscribe({
        next: ({ value }: any) => {
          let awsDeviceData: IAwsDeviceData = {
            id,
            deviceState: null,
            controllState: null,
            controller: null,
            controllTime: null
          };
          if (value.state) {
            const { reported, desired } = value.state;
            if (reported) {
              const { state, controller, connected } = reported;
              awsDeviceData = updateObject(awsDeviceData, {
                deviceState: connected ? state : "disconnected",
                connected,
                controller,
                controllState: state,
                controllTime: state && value.metadata.reported.state.timestamp
              });
            }
            if (desired) {
              const { state, controller } = desired;
              awsDeviceData = updateObject(awsDeviceData, {
                controller,
                controllState: state,
                controllTime: value.metadata.desired.state.timestamp
              });
            }
          }
          dispatchEvent(setAwsDeviceData(awsDeviceData));
        },
        error: (error: any) => console.error(error),
        complete: () => console.log("Done")
      });
    }
    setTimeout(async () => {
      const topics = deviceIdsArray.map(id => `$aws/things/${id}/shadow/get`);
      await PubSub.publish(topics, null);
    }, 2000);
  };
};
