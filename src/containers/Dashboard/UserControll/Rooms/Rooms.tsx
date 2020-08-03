import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../store/actions";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IStoreState } from "../../../../store/reducers";

const Rooms = () => {
  const { selectedBuildingId } = useSelector(
    (state: IStoreState) => state.buildings
  );
  const { rooms, selectedRoomId, error } = useSelector(
    (state: IStoreState) => state.rooms
  );

  const dispatch = useDispatch();
  const onFetchRooms = useCallback(
    () =>
      selectedBuildingId && dispatch(actions.fetchRooms(selectedBuildingId)),
    [dispatch, selectedBuildingId]
  );

  useEffect(() => {
    onFetchRooms();
  }, [onFetchRooms]);

  const onChangeRoom = (roomId: string) => dispatch(actions.selectRoom(roomId));

  let renderRooms: JSX.Element | JSX.Element[] = error ? (
    <h5>Rooms cannot be loaded</h5>
  ) : (
    <CircularProgress />
  );
  if (rooms) {
    if (rooms.length === 0) {
      renderRooms = <h5>No rooms in this building</h5>;
    } else {
      renderRooms = rooms.map((r, index) => (
        <div key={r._id}>
          <RadioButton
            label={r.name}
            name="room"
            value={r.name}
            changed={() => onChangeRoom(r._id)}
            checked={r._id === selectedRoomId}
          />
        </div>
      ));
    }
  }

  return <div>{renderRooms}</div>;
};

export default Rooms;
