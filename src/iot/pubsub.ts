import { PubSub } from "aws-amplify";

export const iotPublish = (
  deviceId: string,
  state: string,
  controller: string
) => {
  PubSub.publish(`$aws/things/${deviceId}/shadow/update`, {
    state: {
      desired: {
        state,
        controller
      }
    }
  });
};
