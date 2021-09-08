/* eslint-disable @typescript-eslint/no-explicit-any */
import { Video } from 'components/core';
import { useCanvas } from 'hooks';
import { CircularAddIcon } from 'icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import { detectVehiclesApi } from 'services/endpoints';
import { trimBase64Data } from 'utils/image';
import videojs from 'video.js';

import AddTrafficLaneModal from '../AddTrafficLaneModal';
import TrafficLight from '../TrafficLight';
import { initialLaneValues } from '../schema';
import { LaneFormValues, TrafficLaneBoxProps } from './types';
import { VehicleCount } from 'services/models';

const TrafficLaneBox: FC<TrafficLaneBoxProps> = ({ data, lanes, setLanes }) => {
  const [laneId, setLaneId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicleCount, setVehicleCount] = useState<number | null>(0);

  const snapshotCanvasNode = useRef<HTMLCanvasElement>(null);
  const videoNode = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  const { canvasNode, drawOnCanvas } = useCanvas();

  const captureSnapshot = (): string => {
    const video = videoNode.current as HTMLVideoElement;
    const canvas = canvasNode.current as HTMLCanvasElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas
      .getContext('2d')
      ?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imageBase64 = trimBase64Data(canvas.toDataURL());
    return imageBase64;
  };

  const getVehicleCount = async (): Promise<VehicleCount> => {
    const imageBase64 = captureSnapshot();
    drawOnCanvas(imageBase64);
    setVehicleCount(null);

    const response = await detectVehiclesApi({
      image: imageBase64,
      return_bbox_image: true,
    });

    if (response.data) {
      drawOnCanvas(response.data.image);
      setVehicleCount(response.data.count.total);
      return response.data.count;
    }
    setVehicleCount(0);
    return {
      car: 0,
      motorbike: 0,
      truck: 0,
      bus: 0,
      total: 0,
    };
  };

  const onAdd = (value: LaneFormValues) => {
    setLanes(arr => {
      setLaneId(arr.length + 1);
      return [
        ...arr,
        {
          ...value,
          detectCallback: getVehicleCount,
        },
      ];
    });
  };

  const lane = laneId ? lanes[laneId - 1] : { ...initialLaneValues };

  useEffect(() => {
    if (lane?.videoUrl && videoNode.current) {
      const options = {
        sources: [{ src: lane.videoUrl }],
        controls: true,
        autoplay: true,
      };

      playerRef.current = videojs(videoNode.current, options);
    }
  }, [lane?.videoUrl]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const details = [
    {
      label: 'Name:',
      value: lane?.name || '-',
    },
    {
      label: 'Vehicles:',
      value: vehicleCount ?? 'Analyzing...',
    },
    {
      label: 'Score:',
      value: data && laneId ? data.score_details[laneId - 1] : '-',
    },
  ];

  return (
    <>
      {lane?.videoUrl ? (
        <div className="shadow-xl bg-white rounded-md h-56">
          <div className="flex h-40">
            <Video
              videoNode={videoNode}
              style={{ backgroundColor: 'white' }}
              className="h-40 w-3/6"
            />
            <div className="w-3/6 flex justify-center">
              <canvas ref={canvasNode} />
            </div>
          </div>
          <div className="grid grid-cols-2 px-2 text-sm font-medium">
            <div className="flex flex-col justify-center">
              {details.map(item => (
                <p className="text-gray-500" key={item.label}>
                  {item.label}
                  <span className="ml-1 text-primary">{item.value}</span>
                </p>
              ))}
            </div>
            <div className="flex justify-end items-center">
              <TrafficLight
                currentLight={
                  laneId && data?.green.lane === laneId - 1 ? 'green' : 'red'
                }
              />
            </div>
          </div>

          <div className="hidden">
            <canvas ref={snapshotCanvasNode} />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setModalOpen(true)}
          className="flex flex-col justify-center items-center h-56 border-2 border-dashed rounded-md border-gray-300 gap-1 hover:bg-white hover:border-primary-100 cursor-pointer"
        >
          <CircularAddIcon />
          <p className="text-sm text-gray-500">Add traffic lane</p>
        </div>
      )}

      <AddTrafficLaneModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={onAdd}
      />
    </>
  );
};

export default TrafficLaneBox;
