import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteAnimal, getAnimalById, getAnimalDonates, donateAnimalById, getUserDonateCheck } from '../data/endpoints.js';
import { getUser } from '../util.js';

export async function renderDetails(ctx) {
    const id = ctx.params.id;
    const user = getUser();
    const animal = await getAnimalById(id);
    let animalDonates = await getAnimalDonates(id);
    let userDonates = await getUserDonateCheck(user._id, id);

    async function deleteHandler() {
        if(confirm('Are you sure you want to delete')) {
            await deleteAnimal(id);
            ctx.page.redirect('/');
        }
    }

    async function donateHandler() {
            await donateAnimalById(id);
            animalDonates = await getAnimalDonates(id);
            ctx.render(detailsTemplate(user, animal, deleteHandler, donateHandler, animalDonates));
    }

    ctx.render(detailsTemplate(user, animal, deleteHandler, donateHandler, animalDonates, userDonates));

}

const detailsTemplate = (user, animal, deleteHandler, donateHandler, animalDonates, userDonates) => html`
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${animal.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${animal.name}</h1>
                        <h3>Breed: ${animal.breed}</h3>
                        <h4>Age: ${animal.age}</h4>
                        <h4>Weight: ${animal.weight}</h4>
                        <h4 class="donation">Donation: ${animalDonates * 100}</h4>
                    </div>
                    ${user ? html`<div class="actionBtn">
                    ${user._id === animal._ownerId ? 
                      html`<a href="/edit/${animal._id}" class="edit">Edit</a>
                    <a @click=${deleteHandler} href="javascript:void(0)" class="remove">Delete</a>` 
                    : html`${userDonates == 0 ? html`<a @click=${donateHandler} href="javascript:void(0)" class="donate">Donate</a>`: nothing}`}
                    </div>` : nothing }
                </div>
            </div>
        </section>
`;