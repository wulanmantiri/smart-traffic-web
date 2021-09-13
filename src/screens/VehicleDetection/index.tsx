import React, { FC, useState } from 'react';
import { Loader, DataDisplay, Navbar } from 'components/core';
import { FileUpload, RadioButton } from 'components/form';
import { detectVehiclesApi } from 'services/endpoints';
import { convertBase64toBlob, convertBlobToBase64 } from 'utils/image';
import { getVehicleCount } from './schema';
import { prioritizeQuantityOptions } from 'constants/options';

const VehicleDetectionPage: FC = () => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [vehicleCount, setVehicleCount] = useState(getVehicleCount());
  const [isLoading, setIsLoading] = useState(false);
  const [priority, setPriority] = useState('speed');

  const onFileDrop = async (file: Blob) => {
    setImageBlob(file);
    setIsLoading(true);

    const imageBase64 = await convertBlobToBase64(file);
    const response = await detectVehiclesApi({
      image: imageBase64,
      return_bbox_image: true,
      prioritize_quantity: priority === 'quantity',
    });

    if (response.data) {
      const blob = await convertBase64toBlob(response.data.image);
      setImageBlob(blob);
      setVehicleCount(getVehicleCount(response.data.count));
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full gap-10">
        <div className="flex w-4/5 h-4/6 gap-6">
          <div className="bg-white flex items-center justify-center w-4/5 relative">
            {imageBlob ? (
              <>
                <img
                  src={URL.createObjectURL(imageBlob)}
                  alt="Failed to render image"
                  className="h-full absolute z-0"
                />
                {isLoading ? (
                  <div className="flex flex-col justify-center items-center bg-gray-800 opacity-80 z-10 h-full w-full gap-2">
                    <Loader />
                    <p className="text-gray-100 font-medium">Analyzing</p>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-gray-500 text-sm">No processed image</p>
            )}
          </div>
          <div className="flex flex-col gap-6 justify-between">
            <DataDisplay items={vehicleCount} title="Vehicle Count" />
            <div className="bg-white shadow rounded-md px-4 py-2">
              <RadioButton
                label="Priority"
                sublabel="for file size > 1 MB only"
                options={prioritizeQuantityOptions}
                name="priority"
                value={priority}
                setValue={setPriority}
              />
            </div>
            <FileUpload onFileDrop={onFileDrop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetectionPage;
