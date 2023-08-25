import { html } from '../../node_modules/lit-html/lit-html.js';
import { editAnimal, getAnimalById } from '../data/endpoints.js';
import { createSubmitHandler } from '../util.js';

export async function renderEdit(ctx) {
    const id = ctx.params.id;
    const currAnimal = await getAnimalById(id);
    
    ctx.render(editTemplate(createSubmitHandler(onEdit), currAnimal));

    async function onEdit(animal) {
        if(!animal.name || !animal.breed || !animal.age || !animal.weight || !animal.image) {
            return alert('All fields are required')
        }
        await editAnimal(animal, id);
        ctx.page.redirect(`/details/${id}`);
    }

}

const editTemplate = (handler, animal) => html`
<section id="editPage">
            <form @submit=${handler} class="editForm">
                <img src=${animal.image}>
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" .value=${animal.name} id="name" type="text" value="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" .value=${animal.breed} id="breed" type="text" value="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" .value=${animal.age} id="age" type="text" value="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" .value=${animal.weight} id="weight" type="text" value="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" .value=${animal.image} id="image" type="text" value="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;