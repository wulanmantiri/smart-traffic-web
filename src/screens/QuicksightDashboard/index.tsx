import React, { FC } from 'react';

const QuicksightDashboard: FC = () => {
  return (
    <div className="h-screen bg-gray-50">
      <iframe
        src={process.env.REACT_APP_QUICKSIGHT_EMBED_URL}
        width="700"
        height="500"
      />
    </div>
  );
};

export default QuicksightDashboard;
