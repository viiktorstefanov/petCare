import { html } from '../../node_modules/lit-html/lit-html.js';
import { createAnimal } from '../data/endpoints.js';
import { createSubmitHandler } from '../util.js';

export async function renderCreate(ctx) {

    async function onCreate (data) {
        if(!data.name || !data.breed || !data.age || !data.weight || !data.image) {
            return alert('All fields are required');
        }
        await createAnimal(data);
        ctx.page.redirect('/');
    }

    ctx.render(createTemplate(createSubmitHandler(onCreate)));

}

const createTemplate = (handler) => html`
<section id="createPage">
            <form @submit=${handler} class="createForm">
                <img src="./images/cat-create.jpg">
                <div>
                    <h2>Create PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" placeholder="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" placeholder="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" placeholder="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Create Pet</button>
                </div>
            </form>
        </section>
`;