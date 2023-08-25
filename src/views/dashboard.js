import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAnimals } from '../data/endpoints.js';

export async function renderDashboard(ctx) {
    const animals = await getAnimals();
    ctx.render(dashboardTemplate(animals));
}

const dashboardTemplate = (animals) => html`
<section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                ${animals.length > 0 ? html`${animals.map(animal => animalTemplate(animal))}` 
                : html`<div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`}
                </div></section>
`;

const animalTemplate = (animal) => html`
<div class="animals-board">
<article class="service-img">
    <img class="animal-image-cover" src=${animal.image}>
</article>
<h2 class="name">${animal.name}</h2>
<h3 class="breed">${animal.breed}</h3>
<div class="action">
    <a class="btn" href="/details/${animal._id}">Details</a>
</div>
</div>
`;