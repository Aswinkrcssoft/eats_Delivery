import React, { useEffect, useState } from "react";
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import "./CommonModal.css";
import { order } from "./Model/orders";


interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (action: string, orderId: string) => void;
  onCancel: (action: string, orderId: string) => void;
  orderDetails: order;
  timeLimit: number; // Time limit in seconds
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onCancel,
  orderDetails,
  timeLimit,
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(timeLimit); // Reset the timer when modal opens

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onCancel("Cancel", orderDetails?.orderId); // Automatically cancel the order if time runs out
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or modal close
  }, [isOpen, timeLimit, onCancel, orderDetails?.orderId]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order Preview</IonTitle>
          <button className="modern-close-btn" onClick={onClose}>
            &times;
          </button>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding modal-content">
        <div className="preview-details">
          <h2>Restaurant Name: {orderDetails?.restName}</h2>
          <p>
            <strong>Delivery Commission:</strong> {orderDetails?.totalAmount}
          </p>
          <p>
            <strong>Payment Type:</strong> {orderDetails?.totalAmount}
          </p>
          <h3>Order Details:</h3>
          <ul>
            {orderDetails?.breakdown?.map((item, index) => (
              <li key={index} className="item-detail">
                <span>
                  <strong>{item?.item}</strong> (Qty: {item?.qty})
                </span>
                <span>₹{item?.price}</span>
              </li>
            ))}
          </ul>
          <h3>Total Price: ₹{orderDetails?.totalAmount}</h3>
        </div>
        <p className="timer">
          Time Left: <strong>{timeLeft} seconds</strong>
        </p>
        <div className="modal-actions">
          <IonButton
            color="success"
            onClick={() => onAccept("Accept", orderDetails?.orderId)}
          >
            Accept
          </IonButton>
          <IonButton
            color="danger"
            onClick={() => onCancel("Cancel", orderDetails?.orderId)}
          >
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CommonModal;
