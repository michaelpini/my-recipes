import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public id: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor()
    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], id?: string)
    constructor(name?: string, description?: string, imagePath?: string, ingredients?: Ingredient[], id?: string) {
        this.id = name ? id || crypto.randomUUID() : '';
        this.name = name || '';
        this.description = description || '';
        this.imagePath = imagePath || '';
        this.ingredients = ingredients || [];
    }

}
