//SECTION DEMO
const demo = [
    {
        "id": "task1676898071676",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Appuyer sur ajouter [+] pour ajouter une note"
            },
            {
                "isChecked": "false",
                "task": "Appuyer sur Supprimer pour supprimer toutes les notes"
            },
            {
                "isChecked": "false",
                "task": "Modifier une note en cliquant sur le crayon de la note"
            },
            {
                "isChecked": "false",
                "task": "Supprimer une note en appuyant sur la corbeille de la note"
            },
            {
                "isChecked": "false",
                "task": "Cliquer sur Démo pour ajouter les notes de substitution"
            }
        ],
        "title": "Votre liste de tâche à faire à compléter",
        "date": "2023-12-31",
        "color": "#bf6640"
    },
    {
        "id": "task1676897708233",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            },
            {
                "isChecked": "false",
                "task": "Tâche 2"
            },
            {
                "isChecked": "false",
                "task": "Tâche 3"
            }
        ],
        "title": "Liste 🦄",
        "date": "",
        "color": "#4071bf"
    },
    {
        "id": "task1676897690083",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            },
            {
                "isChecked": "false",
                "task": "Tâche 2"
            },
            {
                "isChecked": "false",
                "task": "Tâche 3"
            },
            {
                "isChecked": "false",
                "task": "Tâche 4"
            },
            {
                "isChecked": "false",
                "task": "Tâche 5"
            },
            {
                "isChecked": "false",
                "task": "Tâche 6"
            }
        ],
        "title": "Liste 🐘",
        "date": "",
        "color": "#ffd700"
    },
    {
        "id": "task1676898039898",
        "tasks": [
            {
                "isChecked": "true",
                "task": "Tâche 1"
            },
            {
                "isChecked": "false",
                "task": "Tâche 2"
            },
            {
                "isChecked": "false",
                "task": "Tâche 3"
            },
            {
                "isChecked": "true",
                "task": "Tâche 4"
            },
            {
                "isChecked": "true",
                "task": "Tâche 5"
            },
            {
                "isChecked": "true",
                "task": "Tâche 6"
            },
            {
                "isChecked": "false",
                "task": "Tâche 7"
            },
            {
                "isChecked": "false",
                "task": "Tâche 8"
            },
            {
                "isChecked": "false",
                "task": "Tâche 9"
            }
        ],
        "title": "Liste 🙀",
        "date": "2023-12-31",
        "color": "#4044bf"
    },
    {
        "id": "task1676798983374",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche"
            }
        ],
        "title": "Liste 🐶",
        "date": "",
        "color": "#9fbf40"
    },
    {
        "id": "task1676852476439",
        "tasks": [],
        "title": "Liste 🐴",
        "date": "",
        "color": "#4093bf"
    }
]

export function getDemo() {
    localStorage.setItem("data", JSON.stringify(demo));
}

// !SECTION