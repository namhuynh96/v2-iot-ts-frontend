import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../store/actions";
import RadioButton from "../../../../components/UI/RadioButton/RadioButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddBuildingForm from "./BuildingForm/AddBuildingForm";
import UpdateBuildingForm from "./BuildingForm/UpdateBuildingForm";
import ConfirmModal from "../../../../components/UI/ConfirmModal/ConfirmModal";
import { IStoreState } from "../../../../store/reducers";

const Buildings: React.FC = () => {
  const [isAddingBuilding, setIsAddingBuilding] = useState(false);
  const [editingBuildingId, setEditingBuildingId] = useState<string | null>(
    null
  );
  const [deletingBuildingId, setDeletingBuildingId] = useState<string | null>(
    null
  );

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

  const deleteBuildingHandler = () => {
    dispatch(actions.deleteBuilding(deletingBuildingId!));
    setDeletingBuildingId(null);
  };

  let renderBuildings: JSX.Element | JSX.Element[] = error ? (
    <h5>Buildings cannot be loaded</h5>
  ) : (
    <CircularProgress />
  );
  if (buildings) {
    renderBuildings = buildings.map(
      (b: { _id: string; name: string }, index: number) => (
        <div key={b._id}>
          {editingBuildingId === b._id ? (
            <UpdateBuildingForm
              buildingData={b}
              buildingIndex={index}
              onCancel={() => setEditingBuildingId(null)}
            />
          ) : (
            <RadioButton
              label={b.name}
              name="building"
              value={b.name}
              changed={() => changeBuildingHandler(b._id)}
              checked={b._id === selectedBuildingId}
              onEdit={() => setEditingBuildingId(b._id)}
              onDelete={() => setDeletingBuildingId(b._id)}
            />
          )}
        </div>
      )
    );
  }

  return (
    <div>
      <Fab
        variant="extended"
        aria-label="add"
        size="small"
        onClick={() => setIsAddingBuilding(true)}
      >
        <AddIcon />
        Add Building
      </Fab>
      {isAddingBuilding && (
        <AddBuildingForm
          onCancel={() => setIsAddingBuilding(false)}
          buildingsName={buildings!.map((b: { name: string }) => b.name)}
        />
      )}
      {renderBuildings}
      <ConfirmModal
        show={deletingBuildingId !== null}
        onCancel={() => setDeletingBuildingId(null)}
        onAccept={deleteBuildingHandler}
      >
        Delete buidling means deleting all the rooms and devices in the building
      </ConfirmModal>
    </div>
  );
};

export default Buildings;
