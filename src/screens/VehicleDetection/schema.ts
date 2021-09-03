import { DataDisplayItemProps } from 'components/core/DataDisplay/types';
import { VehicleCount } from 'services/models';

export const getVehicleCount = (
  count?: VehicleCount,
): DataDisplayItemProps[] => [
  {
    label: 'Car',
    value: count?.car || 0,
  },
  {
    label: 'Motorcycle',
    value: count?.motorbike || 0,
  },
  {
    label: 'Truck',
    value: count?.truck || 0,
  },
  {
    label: 'Bus',
    value: count?.bus || 0,
  },
  {
    label: 'Total',
    value: count?.total || 0,
    labelBold: true,
  },
];
