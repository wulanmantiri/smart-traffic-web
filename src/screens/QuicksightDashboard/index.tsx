import { Loader, Navbar } from 'components/core';
import { useApi } from 'hooks';
import React, { FC } from 'react';
import { getDashboardEmbedUrlApi } from 'services/endpoints';

const QuicksightDashboard: FC = () => {
  const { isLoading, data } = useApi(getDashboardEmbedUrlApi);

  return (
    <>
      <Navbar />
      <div className="pt-12 h-screen">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <Loader color="gray-500" />
            <p className="text-sm text-gray-500">Loading from Quicksight</p>
          </div>
        ) : (
          <iframe src={data?.embed_url} width="100%" height="100%" />
        )}
      </div>
    </>
  );
};

export default QuicksightDashboard;
