import React from 'react';

interface AdminStatusBarProps {
  processingCount: number;
  outOfStockCount: number;
  reviewOrdersLink?: string;
}

const AdminStatusBar: React.FC<AdminStatusBarProps> = ({
  processingCount,
  outOfStockCount,
  reviewOrdersLink,
}) => {
  return (
    <div>
      <h2>Attention</h2>
      {processingCount > 0 && (
        <p>
          ⚠️ {processingCount} order{processingCount !== 1 ? 's' : ''} are waiting in
          <strong> "processing"</strong> state.{' '}
          {reviewOrdersLink && (
            <a href={reviewOrdersLink}>
              Review now
            </a>
          )}
        </p>
      )}
      {outOfStockCount > 0 && (
        <p>📦 {outOfStockCount} product{outOfStockCount !== 1 ? 's are' : ' is'} currently out of stock.</p>
      )}
    </div>
  );
};

export default AdminStatusBar;
