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
        "id": "task1677359026099",
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
        "title": "🙀 Liste",
        "date": "2023-12-31",
        "color": "#4044bf"
    },
    {
        "id": "task1677359528554",
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
        "title": "🐘 Liste",
        "date": "",
        "color": "#ff00d0"
    },
    {
        "id": "task1677359523535",
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
        "title": "🦄 Liste",
        "date": "",
        "color": "#4071bf"
    },
    {
        "id": "task1677359002084",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🦊 Liste",
        "date": "",
        "color": "#b0bf40"
    },
    {
        "id": "task1677359141547",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🐮 Liste",
        "date": "",
        "color": "#6640bf"
    },
    {
        "id": "task1677359035841",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche"
            }
        ],
        "title": "🐶 Liste",
        "date": "",
        "color": "#9fbf40"
    },
    {
        "id": "task1677359048349",
        "tasks": [],
        "title": "🐴 Liste",
        "date": "",
        "color": "#4093bf"
    },
    {
        "id": "task1677358804004",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🦙Liste",
        "date": "",
        "color": "#bfb040"
    },
    {
        "id": "task1677358916429",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🐸 Liste",
        "date": "",
        "color": "#40bfa8"
    },
    {
        "id": "task1677359535987",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🐐 Liste",
        "date": "",
        "color": "#68bf40"
    },
    {
        "id": "task1677359577523",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🦅 Liste",
        "date": "",
        "color": "#4060bf"
    },
    {
        "id": "task1677358882781",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🐍 Liste",
        "date": "",
        "color": "#40bf91"
    },
    {
        "id": "task1677359542271",
        "tasks": [
            {
                "isChecked": "false",
                "task": "Tâche 1"
            }
        ],
        "title": "🐭 Liste",
        "date": "",
        "color": "#66bf40"
    }
]

export function getDemo() {
    localStorage.setItem("data", JSON.stringify(demo));
}

// !SECTION