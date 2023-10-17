import Store from './services/Store.js';
import { loadData } from './services/Scores.js';

import './style.scss';
import './components/layout/Cover/Cover.js';
import './components/layout/Center/Center.js';
import './components/layout/Stack/Stack.js';
import './components/layout/Box/Box.js';
import './components/layout/Cluster/Cluster.js';

import hankenGroteskFont from './assets/fonts/HankenGrotesk-VariableFont_wght.ttf';

/* global app */
window.app = {};
app.store = Store;

window.addEventListener('DOMContentLoaded', async () => {
  await loadData();

  const categoryScores = document.querySelector('#category-scores');
  if (app.store.scores) {
    categoryScores.innerHTML = '';
    for (const score of app.store.scores) {
      const cluster = document.createElement('cluster-l');
      cluster.role = 'listitem';
      cluster.classList.add('category-score', `category-score--${score.category.toLowerCase()}`);
      cluster.setAttribute('justify', 'space-between');
      cluster.innerHTML = `
        <cluster-l align="center" space="var(--s-1)">
          <img class="category-score__icon" src="/icon-${score.category.toLowerCase()}.svg" alt="">
          <h3 class="category-score__category-name">${score.category}</h3>
        </cluster-l>
        <p>
        <span class="category-score__score">${score.score}</span>
        / 100
        </p>
        `;
      categoryScores.appendChild(cluster);
    }
  } else {
    categoryScores.innerHTML = 'Loading ...';
  }

  const styleFont = document.createElement('style');
  styleFont.media = 'screen, print';
  styleFont.innerHTML = `
    @font-face {
      font-family: 'HankenGrotesk';
      font-display: swap;
      font-weight: 100 900;
      src: url(${hankenGroteskFont})
      format('truetype');
    }
  `;
  document.head.appendChild(styleFont);
});
