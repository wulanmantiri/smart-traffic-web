import { Layout } from 'components/core';
import React, { FC, useState } from 'react';
import { decideTrafficLightApi } from 'services/endpoints';
import {
  DecideTrafficLightResponse,
  TrafficLightConfig,
} from 'services/models';
import { v4 as uuidv4 } from 'uuid';
import { TrafficLaneBox, TopRightBox } from './components';
import { LaneDetails } from './components/TrafficLaneBox/types';

const TrafficSimulationPage: FC = () => {
  const [intersectionId, setIntersectionId] = useState<string | null>(null);
  const [data, setData] = useState<DecideTrafficLightResponse | null>(null);
  const [lanes, setLanes] = useState<LaneDetails[]>([]);

  const decideTrafficLight = async (config: TrafficLightConfig) => {
    const id = intersectionId || uuidv4();
    if (!intersectionId) setIntersectionId(id);

    const now = new Date().toJSON();
    const count = await Promise.all(lanes.map(lane => lane.detectCallback()));

    const response = await decideTrafficLightApi({
      lanes: lanes.map((item, i) => ({
        name: item.name,
        time: now,
        intersection_id: id,
        car_count: count[i].car,
        bus_count: count[i].bus,
        motorbike_count: count[i].motorbike,
        truck_count: count[i].truck,
        total_count: count[i].total,
      })),
      history: data
        ? [
            data.green.lane,
            ...data.history.filter(item => item !== data.green.lane),
          ]
        : [],
      consecutive_red_turns: data?.consecutive_red_turns,
      config,
    });
    if (response.data) {
      setData(response.data);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Intersection ID:</p>
          <p className="text-sm text-primary bg-gray-100 p-2 w-4/5">
            {intersectionId || '-'}
          </p>
          {data ? (
            <>
              <p className="text-sm text-gray-500 pt-4">History:</p>
              {data.history.length > 0 ? (
                data.history.map((item, i) => (
                  <div className="flex gap-4" key={`history${i}`}>
                    {lanes.map((lane, ii) => (
                      <p
                        className={`text-sm font-medium ${
                          ii === item ? 'text-green-500' : 'text-red-500'
                        }`}
                        key={`lanehistory${ii}`}
                      >
                        {lane.name}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-sm">-</p>
              )}
            </>
          ) : null}
        </div>

        <div>
          <TrafficLaneBox data={data} lanes={lanes} setLanes={setLanes} />
        </div>
        <div>
          <TopRightBox
            data={data}
            numOfLanes={lanes.length}
            decideTrafficLight={decideTrafficLight}
          />
        </div>

        {Array(6)
          .fill('')
          .map((_, i) => {
            return i % 2 === 0 ? (
              <TrafficLaneBox
                key={i}
                data={data}
                lanes={lanes}
                setLanes={setLanes}
              />
            ) : (
              <div key={i} />
            );
          })}
      </div>
    </Layout>
  );
};

export default TrafficSimulationPage;
