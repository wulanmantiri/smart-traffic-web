import { Button } from 'components/core';
import React, { FC, useEffect, useState } from 'react';
import ConfigSidePanel from '../ConfigSidePanel';
import { convertConfigPayload, initialConfig } from '../schema';
import { TopRightBoxProps } from './types';

const TopRightBox: FC<TopRightBoxProps> = ({
  data,
  numOfLanes,
  decideTrafficLight,
}) => {
  const [numOfTurns, setNumOfTurns] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [config, setConfig] = useState({ ...initialConfig });
  const [panelOpen, setPanelOpen] = useState(false);

  const decide = async () => {
    await decideTrafficLight(convertConfigPayload(config));
    setNumOfTurns(turns => turns + 1);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (numOfTurns > 0) {
      if (
        !config.num_of_turns ||
        numOfTurns < parseInt(config.num_of_turns, 10)
      ) {
        timeoutId = setTimeout(decide, (data?.green.calc_time || 10) * 1000);
      } else {
        setIsSimulating(false);
        setNumOfTurns(0);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfTurns]);

  const details = [
    'Turns left:',
    config.num_of_turns ? parseInt(config.num_of_turns, 10) - numOfTurns : '-',
    'Actual green time:',
    data ? `${data.green.calc_time}s` : '-',
    'Calculated green time:',
    data ? `${data.green.actual_time_details}s` : '-',
  ];

  return (
    <>
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-1">
          <Button styleType="outline" onClick={() => setPanelOpen(true)}>
            Edit Configuration
          </Button>
          <Button
            onClick={() => {
              if (isSimulating) {
                setNumOfTurns(0);
              } else {
                decide();
              }
              setIsSimulating(bool => !bool);
            }}
            disabled={numOfLanes < 3}
          >
            {isSimulating ? 'Stop' : 'Start'} Traffic Simulation
          </Button>
        </div>

        <div className="w-4/5">
          {isSimulating ? (
            <div className="grid grid-cols-2">
              {details.map((item, i) => (
                <div
                  className={`text-sm ${
                    i % 2 === 0 ? 'text-gray-500' : 'text-primary'
                  }`}
                  key={`greendetails${i}`}
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-right text-gray-400">
              Please wait for the live streams to finish loading before starting
              traffic simulation.
            </p>
          )}
        </div>
      </div>

      <ConfigSidePanel
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
        onSubmit={setConfig}
      />
    </>
  );
};

export default TopRightBox;
