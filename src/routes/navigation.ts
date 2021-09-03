import { ROUTES } from 'constants/routes';
import * as SCREENS from 'screens';

export const navigation = [
  {
    exact: true,
    path: ROUTES.trafficSimulation,
    component: SCREENS.TrafficSimulation,
  },
  {
    path: ROUTES.vehicleDetection,
    component: SCREENS.VehicleDetection,
  },
];

export const navbarItems = [
  {
    path: ROUTES.trafficSimulation,
    label: 'Traffic Simulation',
  },
  {
    path: ROUTES.vehicleDetection,
    label: 'Vehicle Detection',
  },
];
