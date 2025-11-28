import React from 'react';

interface AdminStatusBarProps {
  processingCount: number;
  outOfStockCount: number;
  reviewOrdersLink?: string;
}

const AdminStatusBar: React.FC<AdminStatusBarProps> = ({ processingCount, outOfStockCount, reviewOrdersLink }) => {
  const hasAnything = processingCount > 0 || outOfStockCount > 0;

  return (
    <section className="admin-panel admin-panel--status surface-dark">
      <header className="admin-panel__header">
        <h2 className="admin-panel__title">Attention</h2>
      </header>

      <div className="admin-panel__body admin-status">
        {hasAnything ? (
          <>
            {processingCount > 0 && (
              <p>
                <span className="admin-status__icon">⚠️</span>
                <span>
                  {processingCount} order
                  {processingCount !== 1 ? 's are' : ' is'} waiting in
                  <strong> "processing"</strong> state.
                  {reviewOrdersLink && (
                    <>
                      {' '}
                      <a href={reviewOrdersLink} className="admin-status__link">
                        Review now
                      </a>
                    </>
                  )}
                </span>
              </p>
            )}

            {outOfStockCount > 0 && (
              <p>
                <span className="admin-status__icon">📦</span>
                <span>
                  {outOfStockCount} product
                  {outOfStockCount !== 1 ? 's are' : ' is'} currently out of stock.
                </span>
              </p>
            )}
          </>
        ) : (
          <p className="admin-panel__meta">All clear. 🎉</p>
        )}
      </div>
    </section>
  );
};

export default AdminStatusBar;
