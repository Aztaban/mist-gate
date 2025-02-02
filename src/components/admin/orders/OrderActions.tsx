import { useState, ChangeEvent } from 'react';
import { OrderStatus } from '../../../config/orderStatus';
import { Order } from '../../../features/shop/ordersApiSlice';
import Select from '../../common/Select';
import {
  useUpdateOrderShippingMutation,
  useUpdateOrderStatusMutation,
} from '../../../features/shop/ordersApiSlice';
import { ShippingMethod } from '../../../config/shippingConfig';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

interface OrderActionsProps {
  order: Order;
}

const OrderActions = ({ order }: OrderActionsProps) => {
  const navigate = useNavigate();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updateOrderShipping] = useUpdateOrderShippingMutation();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>(
    order?.status || ''
  );
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<
    ShippingMethod | ''
  >(order?.shippingMethod || '');

  const handleSaveChanges = async () => {
    try {
      if (selectedStatus && selectedStatus !== order.status) {
        await updateOrderStatus({
          orderId: order.id,
          status: selectedStatus,
        }).unwrap();
      }

      if (
        selectedShippingMethod &&
        selectedShippingMethod !== order.shippingMethod
      ) {
        await updateOrderShipping({
          orderId: order.id,
          shippingMethod: selectedShippingMethod,
        }).unwrap();
      }
      alert('Order status has been updated successfully');
    } catch (error) {
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

          <form>
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
            <button className='btn save-btn' onSubmit={handleSaveChanges}>Save Changes</button>
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
