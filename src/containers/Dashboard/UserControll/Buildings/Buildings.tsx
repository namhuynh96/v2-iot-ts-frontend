import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../store/actions";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IStoreState } from "../../../../store/reducers";

const Buildings = () => {
  const { buildings, selectedBuildingId, error } = useSelector(
    (state: IStoreState) => state.buildings
  );

  const dispatch = useDispatch();
  const onFetchBuildings = useCallback(
    () => dispatch(actions.fetchBuildings()),
    [dispatch]
  );

  useEffect(() => {
    onFetchBuildings();
  }, [onFetchBuildings]);

  const changeBuildingHandler = (buildingId: string) => {
    dispatch(actions.selectBuilding(buildingId));
  };

  let renderBuildings: JSX.Element | JSX.Element[] = error ? (
    <h5>Buildings cannot be loaded</h5>
  ) : (
    <CircularProgress />
  );
  if (buildings) {
    renderBuildings = buildings.map(b => (
      <div key={b._id}>
        <RadioButton
          label={b.name}
          name="building"
          value={b.name}
          changed={() => changeBuildingHandler(b._id)}
          checked={b._id === selectedBuildingId}
        />
      </div>
    ));
  }

  return <div>{renderBuildings}</div>;
};

export default Buildings;
