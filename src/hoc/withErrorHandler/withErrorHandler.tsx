import React from "react";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal
          show={!!error}
          backdropClicked={errorConfirmedHandler as () => void}
        >
          {error as string}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
