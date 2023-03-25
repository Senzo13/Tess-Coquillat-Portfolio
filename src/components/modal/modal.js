import { useState } from "react";
import { STRING_MODAL } from "../../values/fr/modal/string.modal";

export default function Modal({ props }) {
  const { title, description, callback } = props;

  const [showModal, setShowModal] = useState(false);

  return showModal ? null : (
    <div className="modal" style={{ display: "block", top: "30%" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
              onClick={() => callback(setShowModal(!showModal))}
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
            <input
              type="email"
              id="form3Example3"
              className="form-control form-control-lg"
              placeholder={STRING_MODAL.TEXT_EMAIL}
            />
            <label className="form-label" htmlFor="form3Example3">
              {STRING_MODAL.TEXT_EMAIL_VALID}
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-mdb-dismiss="modal"
              onClick={() => callback(setShowModal(!showModal))}
            >
              {STRING_MODAL.TEXT_CLOSE}
            </button>
            <button type="button" className="btn btn-primary">
              {STRING_MODAL.TEXT_SEND}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
