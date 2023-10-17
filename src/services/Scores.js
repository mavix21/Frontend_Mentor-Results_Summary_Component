import API from './API.js';

/* global app */
export async function loadData () {
  app.store.scores = await API.fetchScores();
}
