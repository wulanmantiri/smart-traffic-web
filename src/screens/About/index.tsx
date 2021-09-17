import architectureDiagram from 'assets/architecture_diagram.png';
import { Navbar } from 'components/core';
import { ROUTES } from 'constants/routes';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { bigLinkStyles, HrefLink, InfoCard } from './components';
import { roadmaps, technologies } from './components/schema';

const About: FC = () => (
  <div>
    <Navbar />
    <div className="pt-36 pb-24 h-full flex flex-col items-center justify-center gap-4">
      <div className="flex uppercase text-gray-500 text-md gap-2">
        <p className="text-green-700">Machine Learning</p>
        <p>•</p>
        <p className="text-primary-100">AWS Serverless</p>
        <p>•</p>
        <p className="text-indigo-600">Data Analytics</p>
      </div>

      <h1 className="text-5xl lg:text-6xl font-medium text-gray-700 text-center">
        Smart Traffic Lights (STL) Web
      </h1>

      <p className="mt-8 text-xl text-gray-500 w-4/6 text-center tracking-wide">
        A one-stop application to provide simulations on automated density-based
        traffic light signals and analytics dashboard on the traffic flow.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to={ROUTES.trafficSimulation}
          className={`${bigLinkStyles} text-white bg-primary hover:bg-primary-700`}
        >
          Simulate Traffic
        </Link>
        <a
          href="https://youtu.be/LCd_MisLCvY"
          target="_blank"
          className={`${bigLinkStyles} text-gray-200 bg-squid hover:text-white`}
        >
          Watch Demo
        </a>
      </div>
    </div>

    <div className="bg-gray-50 flex flex-col items-center py-16">
      <div className="grid grid-cols-3 px-12 w-full gap-10">
        <InfoCard title="Decision-making Algorithm">
          <p>
            The traffic light signals are decided with a{' '}
            <span className="text-primary font-medium">score-based rule</span>,
            where the highest score will get a green light turn.
          </p>
          <div>
            <p>A lane's score is a product of these 2 factors:</p>
            <ul className="list-decimal list-inside">
              <li>
                probability of getting a green light based on history, and
              </li>
              <li>the number of detected vehicles.</li>
            </ul>
          </div>
          <p>
            <span className="text-primary font-medium">Probability: </span> The
            more recent a lane gets a green turn, the lesser chance it will get
            another green.
          </p>
          <p className="text-sm">
            For example, in an intersection consisting road A, B, and C, road A
            recently gets a green light turn after road B. The probability of
            road A will be the smallest (25%), followed by Road B (50%), and so
            on. Initially, each lane will get 100% probability.
          </p>
          <p className="text-sm">
            <span className="text-primary font-medium">
              Prioritized lanes:{' '}
            </span>
            If there are lanes that get more than X red lights in a row and have
            at least 1 queueing vehicle, those lanes will be prioritized,
            leaving the rest with 0% probability. The threshold X is set to be
            the number of lanes in the intersection.
          </p>
        </InfoCard>

        <InfoCard title="User-defined Configuration">
          <p>
            The green time is calculated with a{' '}
            <span className="text-primary font-medium">ratio-based rule</span>,
            or in other words, is a product of ratio and number of detected
            vehicles in the green lane.
          </p>
          <div>
            <p>Users are given the option to customize the configuration on</p>
            <ul className="list-inside list-disc">
              <li>green time range (default: 10 - 60 seconds)</li>
              <li>vehicle to green time ratio (default: 1 to 1)</li>
            </ul>
          </div>
          <p>
            <span className="text-primary font-medium">Range: </span> If the
            calculated green time is not within the range, it will fallback to
            either the minimum or maximum time.
          </p>
          <p>
            <span className="text-primary font-medium">Ratio: </span> Ratio can
            vary among intersections. For example, wide roads can have 10
            vehicles passing in 5 seconds during the green time, while narrow
            roads will need 10 seconds for the same number of 10 vehicles to
            pass.
          </p>
        </InfoCard>

        <InfoCard title="Data Visualization">
          <div>
            <p>
              Every time the algorithm makes a traffic light decision, it will
              store <span className="text-primary font-medium">data logs </span>
              from each traffic lane consisting of
            </p>
            <ul className="list-inside list-disc">
              <li>lane or road name,</li>
              <li>intersection ID,</li>
              <li>current time, and</li>
              <li>the number of detected vehicles.</li>
            </ul>
          </div>
          <p>
            <span className="text-primary font-medium">Data logs </span> are
            transferred to a Lambda function that directly puts it in a Kinesis
            Firehose delivery stream into a S3 bucket destination.
          </p>

          <div>
            <p>
              <span className="text-primary font-medium">Analysis: </span> The
              dataset were then imported from S3 to QuickSight that creates a
              dashboard on
            </p>
            <ul className="list-inside list-disc">
              <li>total intersections in the system,</li>
              <li>average vehicles per day,</li>
              <li>number of vehicles per road,</li>
              <li>vehicle trends per intersection, etc.</li>
            </ul>
          </div>
        </InfoCard>
      </div>
    </div>

    <div className="grid grid-cols-5 p-12">
      <div className="col-span-3">
        <img src={architectureDiagram} />
      </div>

      <div className="col-span-2 flex flex-col justify-center ml-16">
        <div className="space-y-6">
          <p className="text-2xl tracking-wide font-medium text-primary-100">
            Infrastructure as Code
          </p>
          <ul className="list-inside list-disc text-gray-800 text-lg">
            {roadmaps.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="space-y-1">
            <p className="text-gray-600 font-medium">Technologies Used:</p>
            <div className="text-gray-600 flex flex-wrap gap-1">
              {technologies.map(item => (
                <p key={item}>{item} •</p>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <p>GitHub: </p>
            <HrefLink href="https://github.com/wulanmantiri/smart-traffic-web">
              Web
            </HrefLink>
            <p>•</p>
            <HrefLink href="https://github.com/wulanmantiri/smart-traffic-api">
              API
            </HrefLink>
            <p>•</p>
            <HrefLink href="https://github.com/wulanmantiri/smart-traffic-notebook/blob/master/index.ipynb">
              Jupyter Notebook
            </HrefLink>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-squid flex justify-between p-2 sm:px-6 text-sm text-gray-200">
      <div className="flex gap-1">
        <a href="https://www.linkedin.com/in/wulanmantiri/" target="_blank">
          Wulan Mantiri
        </a>
        <p>• September 2021</p>
      </div>
      <p>ASEAN Public Sector • AWS Solutions Architecture</p>
    </div>
  </div>
);

export default About;
