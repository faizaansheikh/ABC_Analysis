// const { default: axios } = require("axios");
import axios from "axios";
const BASE_URL = `http://192.168.1.10:2654`;

const BASE_URL_2 = "http://192.168.1.10:2654";

// /sumgraph

export const getSegMeasureApi = async () => {
  try {
    return await axios.get(`${BASE_URL}/dropdown/segmentation_measure`);
  } catch (error) {
    return error.message;
  }
};
export const getPrimaryCalApi = async () => {
  try {
    return await axios.get(`${BASE_URL}/dropdown/primary_calculation_level`);
  } catch (error) {
    return error.message;
  }
};
export const getPeriodicity = async () => {
  try {
    return await axios.get(`${BASE_URL}/dropdown/periodicity`);
  } catch (error) {
    return error.message;
  }
};

export const getSecondaryCalculationLevel = async (value) => {
  try {
    return await axios.get(
      `${BASE_URL}/dropdown/secondary_calculation_level?q=${value}`
    );
  } catch (error) {
    return error.message;
  }
};
export const getSegMethod = async () => {
  try {
    return await axios.get(`${BASE_URL}/dropdown/segmentation_method`);
  } catch (error) {
    return error.message;
  }
};
export const getSegMeasureXYZ = async () => {
  try {
    return await axios.get(`${BASE_URL}/dropdown/segmentation_measure_xyz`);
  } catch (error) {
    return error.message;
  }
};

export const postSegmentaion = async (payload) => {
  try {
    return await axios.post(`${BASE_URL}/segmentation_setup`, { ...payload });
  } catch (error) {
    return error.message;
  }
};

export const getSummary = async () => {
  try {
    return await axios.get(`${BASE_URL_2}/sumgraph`);
  } catch (error) {
    return error.message;
  }
};

export const getProfile = async (payload) => {
  try {
    return await axios.get(`${BASE_URL_2}/filters?mode=${payload.mode}`);
  } catch (error) {
    return error.message;
  }
};

export const getTable = async (payload) => {
  try {
    return await axios.get(`${BASE_URL_2}/params?profile=${payload.profile}`);
  } catch (error) {
    return error.message;
  }
};

export const resTable = async (payload) => {
  try {
    return await axios.post(`${BASE_URL_2}/tablegen`, { ...payload });
  } catch (error) {
    return error.message;
  }
};

export const timeSeriesGraph = async (payload) => {
  try {
    return await axios.get(`${BASE_URL_2}/visgraph?profile=${payload.profile}`);
  } catch (error) {
    return error.message;
  }
};

export const getSummaryModal = async () => {
  try {
    return await axios.get(`${BASE_URL_2}/modaldata`);
  } catch (error) {
    return error.message;
  }
};

// export const getGraphs = async (payload) => {
//   try {
//     return await axios.get(`${BASE_URL_2}/calcs?profile=${payload.profile}`);
//   } catch (error) {
//     return error.message;
//   }
// };

export const getSentence = async () => {
  try {
    return await axios.get(`${BASE_URL_2}/sentence`);
  } catch (error) {
    return error.message;
  }
};

export const getGiniIndex = async (payload) => {
  try {
    return await axios.get(
      `${BASE_URL_2}/gini index?profile=${payload.profile}`
    );
  } catch (error) {
    return error.message;
  }
};

export const getOtherGraphs = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL_2}/calcs`,{...payload}
    );
  } catch (error) {
    return error.message;
  }
};

export const getModalData = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL_2}/modaldata`,{...payload}
    );
  } catch (error) {
    return error.message;
  }
};
 