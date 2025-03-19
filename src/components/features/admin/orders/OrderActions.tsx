import { useState } from 'react';
import { OrderStatus, ShippingMethod } from '@config';
import { Order } from '@types';
import Select from '@components/common/Select';
import { useUpdateOrderMutation } from '@features/apiSlices/ordersApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/state/useAuth';

interface OrderActionsProps {
  order: Order;
}

const OrderActions = ({ order }: OrderActionsProps) => {
  const navigate = useNavigate();
  const [updateOrder] = useUpdateOrderMutation();

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>(
    order?.status || ''
  );
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<
    ShippingMethod | ''
  >(order?.shippingMethod || '');

  const handleSaveChanges = async () => {
    try {
      const updates: Partial<Order> = {};
      if (selectedStatus && selectedStatus !== order.status) {
        updates.status = selectedStatus;
      }
      if (
        selectedShippingMethod &&
        selectedShippingMethod !== order.shippingMethod
      ) {
        updates.shippingMethod = selectedShippingMethod;
      }

      if (Object.keys(updates).length > 0) {
        await updateOrder({
          orderId: order.id,
          updates,
        }).unwrap();
        alert('Order has been updated successfully');
      } else {
        alert('No changes to save');
      }
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order status');
    }
  };

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <>
      {useAuth().isAdmin && (
        <section className="admin-tools">
          <h3 className="header-wrapper">Admin Tools</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveChanges();
            }}
          >
            <Select
              id="status"
              label="Update Status"
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value as OrderStatus)
              }
              options={Object.values(OrderStatus)}
              optionLabel={(status) =>
                status.charAt(0).toUpperCase() + status.slice(1)
              }
            />

            <Select
              id="shippingMethod"
              label="Update Shipping Method"
              value={selectedShippingMethod}
              onChange={(event) =>
                setSelectedShippingMethod(event.target.value as ShippingMethod)
              }
              options={Object.values(ShippingMethod)}
              optionLabel={(method) =>
                method.charAt(0).toUpperCase() + method.slice(1) + ' Shipping'
              }
            />
            <button type="submit" className="btn save-btn">
              Save Changes
            </button>
          </form>
        </section>
      )}
      <div className="checkout-buttons">
        <button className="btn back-btn" onClick={handleBackBtn}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default OrderActions;
