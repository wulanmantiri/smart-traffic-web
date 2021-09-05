import { api, ApiResponse, RequestMethod } from 'services/api';

import {
  DecideTrafficLightRequest,
  DecideTrafficLightResponse,
  DetectVehiclesRequest,
  DetectVehiclesResponse,
  GetDashboardEmbedUrlResponse,
} from './models';
import { apiUrls } from './urls';

export const detectVehiclesApi = (
  body: DetectVehiclesRequest,
): ApiResponse<DetectVehiclesResponse> => {
  return api(apiUrls.detectVehicles, RequestMethod.POST, body);
};

export const decideTrafficLightApi = (
  body: DecideTrafficLightRequest,
): ApiResponse<DecideTrafficLightResponse> => {
  return api(apiUrls.decideTrafficLight, RequestMethod.POST, body);
};

export const getDashboardEmbedUrlApi =
  (): ApiResponse<GetDashboardEmbedUrlResponse> => {
    return api(apiUrls.dashboardEmbedUrl, RequestMethod.GET);
  };
