import "./style.css";
// récupération des éléments html
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

// à la soumission du formulaire, on empeche le rafraichissement de la page et on appelle la fonction ajouter
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const value = input.value;
	input.value = "";
	addTodo(value);
});

// on construit un tableau de todos avec du texte, un statut, et un mode edition
const todos = [

];

// On map le tableau soit en mode edition soit en mode creation et on ajoute des noeuds ul en fonction.
const displayTodo = () => {
	const todosNode = todos.map((todo, index) => {
		if (todo.editMode) {
			return createTodoEditElement(todo, index);
		} else {
			return createTodoElement(todo, index);
		}
	});
	ul.innerHTML = "";
	ul.append(...todosNode);
};

//Création d'élément li:
// création d'un li + bouton "supprimer" + bouton "Edit"
// au click du bouton supprimer, on stop la propa et on appelle la fonction supprimer
// au click du bouton edit, on stop la propa et on appelle la fonction editer
//création d'un span: rond rempli ou pas en fonction du statut
// au click du li, on appelle la fonction toogleTodo pour remplir ou non le rond
// on ajoute les boutons edit et supprimer à la li
const createTodoElement = (todo, index) => {
	const li = document.createElement("li");
	const buttonDelete = document.createElement("button");
	buttonDelete.innerHTML = "Delete";
	const buttonEdit = document.createElement("button");
	buttonEdit.innerHTML = "Edit";
	buttonDelete.addEventListener("click", (event) => {
		event.stopPropagation();
		deleteTodo(index);
	});
	buttonEdit.addEventListener("click", (event) => {
		event.stopPropagation();
		toggleEditMode(index);
	});
	li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;
	li.addEventListener("click", (event) => {
		toggleTodo(index);
	});
	li.append(buttonEdit, buttonDelete);
	return li;
};

// Ajouter un todo: on ajoute un todo au tableau de todos avec un text et un statut
// on raffraichit en affichant la todo
const addTodo = (text) => {
	todos.push({
		text,
		done: false,
	});
	displayTodo();
};
// Supprimer un todo: on supprime un todo du tableau de todos en fonction de son index
// on raffraichit en affichant la todo
const deleteTodo = (index) => {
	todos.splice(index, 1);
	displayTodo();
};
// remplissage du rond: on inverse le remplissage du rond grace au statut done.
// on raffraichit en affichant la todo
const toggleTodo = (index) => {
	todos[index].done = !todos[index].done;
	displayTodo();
};
// afficher ou non le mode edition
// on raffraichit en affichant la todo
const toggleEditMode = (index) => {
	todos[index].editMode = !todos[index].editMode;
	displayTodo();
};

// editer une todo
// on récupère la value de l'input
//on assigne cette value au text
// on set editMode à false par défaut
const editTodo = (index, input) => {
	const value = input.value;
	todos[index].text = value;
	todos[index].editMode = false;
	displayTodo();
};

//Création d'élément li en mode edition:
// création d'un li + input + bouton "save" + bouton "cancel"
// au click du bouton cancel, on stop la propa et on appelle la fonction affichage du mode edition(qui fait l'inverse)
// au click du bouton save, on stop la propa et on appelle la fonction editer
// on ajoute les boutons cancel et save à la li
const createTodoEditElement = (todo, index) => {
	const li = document.createElement("li");
	const input = document.createElement("input");
	input.type = "text";
	input.value = todo.text;
	const buttonSave = document.createElement("button");
	buttonSave.innerHTML = "Save";
	const buttonCancel = document.createElement("button");
	buttonCancel.innerHTML = "Cancel";
	buttonCancel.addEventListener("click", (event) => {
		event.stopPropagation();
		toggleEditMode(index);
	});
	buttonSave.addEventListener("click", (event) => {
		editTodo(index, input);
	});
	li.append(input, buttonCancel, buttonSave);
	return li;
};

displayTodo();
