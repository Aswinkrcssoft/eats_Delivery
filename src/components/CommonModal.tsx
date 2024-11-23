// CommonModal.tsx
import React, { useEffect, useState } from "react";
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import "./CommonModal.css";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel: () => void;
  orderDetails: {
    restaurantName: string;
    deliveryCommission: string;
    paymentType: string;
    items: OrderItem[]; // Array of items
  };
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
          onCancel(); // Automatically cancel the order if time runs out
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or modal close
  }, [isOpen, timeLimit, onCancel]);

  const calculateTotalPrice = () => {
    return orderDetails.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

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
          <h2>Restaurant Name: {orderDetails.restaurantName}</h2>
          <p>
            <strong>Delivery Commission:</strong> {orderDetails.deliveryCommission}
          </p>
          <p>
            <strong>Payment Type:</strong> {orderDetails.paymentType}
          </p>
          <h3>Order Details:</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index} className="item-detail">
                <span>
                  <strong>{item.name}</strong> (Qty: {item.quantity})
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h3>Total Price: ₹{calculateTotalPrice()}</h3>
        </div>
        <p className="timer">
          Time Left: <strong>{timeLeft} seconds</strong>
        </p>
        <div className="modal-actions">
          <IonButton color="success" onClick={onAccept}>
            Accept
          </IonButton>
          <IonButton color="danger" onClick={onCancel}>
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CommonModal;
