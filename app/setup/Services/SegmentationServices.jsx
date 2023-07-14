// const { default: axios } = require("axios");
import axios from "axios";
const BASE_URL = `http://192.168.1.10:2654`;

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
    return await axios.post(`${BASE_URL}/segmentation_setup`, {...payload})
  } catch (error) {
    return error.message
  }
}