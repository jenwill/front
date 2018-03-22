import superagent from 'superagent';
import {logError} from '../lib/utils';

export const fetchProfile = profile => ({
  type: 'PROFILE_FETCH',
  payload: profile,
});

export const getProfile = token => dispatch => {
  return superagent.get(`${__API_URL__}/api/v1/profile`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => dispatch(fetchProfile(res.body)))
    .catch(logError);
};
