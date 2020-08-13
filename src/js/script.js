class FormCreate {
    formOpenID;
    formID;
    formAction;
    formMethod;
    formName;
    formNode;
    packageNode;
    constructor(
        formOpenID,
        formID,
        formAction,
        formMethod,
        formName,
        controls
    ) {
        this.formOpenID = formOpenID;
        this.formID = formID;
        this.formAction = formAction;
        this.formMethod = formMethod;
        this.formName = formName;
        document
            .querySelector(`#${formOpenID}`)
            .addEventListener("click", (e) => {
                this.loadForm();
                controls(this);
            });
    }
    loadForm() {
        this.formNode = this.createForm(
            this.formID,
            this.formAction,
            this.formMethod
        );
        this.inputElements("body", [this.formNode]);
        this.packageNode = this.createBlock(
            "div",
            "package",
            `<span>${this.formName}</span>`
        );
        this.inputElements(`#${this.formID}`, [this.packageNode]);
    }

    addControls(controls) {
        document
            .querySelector(`#${this.formOpenID}`)
            .addEventListener("click", (e) => {
                controls;
            });
    }

    addInput(parentId, parentText, inpType, inpName) {
        let parentNode = this.createBlock(
            "div",
            `form__${parentId}`,
            parentText
        );
        this.inputElements("#package", [parentNode]);

        let node = this.createInput(inpType, inpName);
        this.inputElements(`#form__${parentId}`, [node]);
    }

    addInputFile(parentId, parentText, inpFile, inpName) {
        let parentNode = this.createBlock(
            "div",
            `form__${parentId}`,
            parentText
        );
        this.inputElements("#package", [parentNode]);

        let node = this.createInputFile(inpName, inpFile);
        this.inputElements(`#form__${parentId}`, [node]);
    }

    addButtons() {
        let parentNode = this.createBlock("div", "form__buttons", "");
        this.inputElements("#package", [parentNode]);

        let submitNode = this.createButton("submit", "Potwierdź", "");
        let cancelNode = this.createButton("button", "Anuluj", "cancel");

        this.inputElements("#form__buttons", [submitNode, cancelNode]);

        document.querySelector("#cancel").addEventListener("click", () => {
            document.body.removeChild(
                document.querySelector("#form-group-add")
            );
        });
    }

    createBlock(a, id, text) {
        let obj = document
            .createElement("block")
            .appendChild(document.createElement(a));
        obj.id = id;
        obj.innerHTML = text;
        return obj;
    }

    createInput(type, name) {
        let n = document.createElement("input");
        n.type = type;
        n.name = name;
        return n;
    }

    createInputFile(name, accept) {
        let n = document.createElement("input");
        n.type = "file";
        n.name = name;
        n.accept = accept;
        return n;
    }

    inputElements(parentId, elm) {
        elm.forEach((element) => {
            document.querySelector(parentId).appendChild(element);
        });
    }

    createButton(type, text, id) {
        var sub = document.createElement("button");
        sub.type = type;
        sub.innerText = text;
        sub.id = id;
        return sub;
    }

    createForm(id, action, method) {
        let obj = document
            .createElement("block")
            .appendChild(document.createElement("form"));
        obj.id = id;
        obj.action = action;
        obj.method = method;
        return obj;
    }
}

var fGA = new FormCreate(
    "form-group-add-open",
    "form-group-add",
    "fun/createGroup",
    "post",
    "Dodawanie grupy",
    (fGA) => {
        fGA.addInput("name", "Nazwa grupy ", "text", "grpName");
        fGA.addInput("tag", "Tag grupy ", "text", "grpTag");
        fGA.addInputFile("file", "Img grupy ", "file", "grpImg");
        fGA.addButtons();
    }
);
